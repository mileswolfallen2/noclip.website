
import ArrayBufferSlice from "../ArrayBufferSlice";
import { vec2, vec3, vec4 } from "gl-matrix";
import { Color, colorNewFromRGBA, TransparentBlack, White } from "../Color";
import { hexzero0x } from "../util";

function colorNewFromARGB8(n: number): Color {
    const a = ((n >>> 24) & 0xFF) / 0xFF;
    const r = ((n >>> 16) & 0xFF) / 0xFF;
    const g = ((n >>>  8) & 0xFF) / 0xFF;
    const b = ((n >>>  0) & 0xFF) / 0xFF;
    return colorNewFromRGBA(r, g, b, a);
}

function consume<T>(a: T[], b: T[]): T[] {
    while (b.length) {
        a.push(b.pop()!);
    }
    return a;
}

const enum ROTATION_TYPE {
    INVALID = -1,
    EULER_32,
    QUATERNION,
    EULER_16,
}

const rotationTypes: ROTATION_TYPE[] = [
    ROTATION_TYPE.INVALID,    // 0
    ROTATION_TYPE.EULER_32,   // 1
    ROTATION_TYPE.EULER_32,   // 2
    ROTATION_TYPE.EULER_32,   // 3
    ROTATION_TYPE.EULER_32,   // 4
    ROTATION_TYPE.EULER_32,   // 5
    ROTATION_TYPE.EULER_32,   // 6
    ROTATION_TYPE.EULER_32,   // 7
    ROTATION_TYPE.QUATERNION, // 8
    ROTATION_TYPE.QUATERNION, // 9
    ROTATION_TYPE.INVALID,    // 10
    ROTATION_TYPE.INVALID,    // 11
    ROTATION_TYPE.QUATERNION, // 12
    ROTATION_TYPE.QUATERNION, // 13
    ROTATION_TYPE.INVALID,    // 14
    ROTATION_TYPE.INVALID,    // 15
    ROTATION_TYPE.EULER_16,   // 16
    ROTATION_TYPE.EULER_16,   // 17
    ROTATION_TYPE.INVALID,    // 18
    ROTATION_TYPE.INVALID,    // 19
    ROTATION_TYPE.EULER_16,   // 20
    ROTATION_TYPE.EULER_16,   // 21
    ROTATION_TYPE.INVALID,    // 22
    ROTATION_TYPE.INVALID,    // 23
    ROTATION_TYPE.INVALID,    // 24
    ROTATION_TYPE.INVALID,    // 25
    ROTATION_TYPE.INVALID,    // 26
    ROTATION_TYPE.INVALID,    // 27
    ROTATION_TYPE.INVALID,    // 28
    ROTATION_TYPE.INVALID,    // 29
    ROTATION_TYPE.INVALID,    // 30
    ROTATION_TYPE.INVALID,    // 31
]

export const enum FILTER_MODE {
    POINT,
    BILINEAR,
    TRILINEAR,
}

interface NJS_TEXTURE {
	texture:      number;

	flipU:        number;
	flipV:        number;
	clampU:       number;
	clampV:       number;
	mipMapAdjust: number;
	filterMode:   number;
    superSample:  number;
}

export const enum NJS_BLENDALPHA {
    ZERO = 0,
    ONE,
    OTHER_COLOR,
    ONE_MINUS_OTHER_COLOR,
    SRC_ALPHA,
    ONE_MINUS_SRC_ALPHA,
    DST_ALPHA,
    ONE_MINUS_DST_ALPHA,
}

interface NJS_MATERIAL {
	diffuse:  Color;
	ambient:  Color;
	specular: Color;

	srcAlpha:  number;
	dstAlpha:  number;

	texture?: NJS_TEXTURE;
}

export interface NJS_VERTS {
	positions: vec3[];
	normals:   vec3[];
	uvs:       vec2[];
	diffuse:   Color[];
	specular:  Color[];
}

export const enum NJS_ATTRIBUTE_FLAGS {
    IGNORE_LIGHT    = (1 << 0),
    IGNORE_SPECULAR = (1 << 1),
    IGNORE_AMBIENT  = (1 << 2),
    USE_ALPHA       = (1 << 3),
    DOUBLE_SIDED    = (1 << 4),
    FLAT_SHADING    = (1 << 5),
    ENV_MAPPING     = (1 << 6),
}

interface NJS_STRIP {
    flags:   number;
    flip:    boolean;

	indices: number[];
	normals: vec3[];
	uvs:     vec2[];
	diffuse: Color[];
}

export interface NJS_MESH {
    material: NJS_MATERIAL;
    type:     number;
    flags:    number;
    vertices: NJS_VERTS;
    indices:  number[];
}

interface NJS_MESHSET {
    material: NJS_MATERIAL;
    type:     number;
    flags:    number;
    strips:   NJS_STRIP[];
}

export interface NJS_MODEL {
	vertices: NJS_VERTS;
	polygons: NJS_MESHSET[];
	meshes:   NJS_MESH[];

    bounds:   vec4;
}

export const enum NJS_EVALFLAGS {
    EVAL_UNIT_POS   = (1 << 0),
    EVAL_UNIT_ROT   = (1 << 1),
    EVAL_UNIT_SCL   = (1 << 2),
    EVAL_HIDE       = (1 << 3),
    EVAL_BREAK      = (1 << 4),
    EVAL_ZXY_ANG    = (1 << 5),
    EVAL_SKIP       = (1 << 6),
    EVAL_SHAPE_SKIP = (1 << 7),
}

export interface NJS_OBJECT {
	flags:    number;

	index:    number;
	parent:   number;
	child:    number;
	sibling:  number;

	position: vec3;
	rotation: vec3;
	scale:    vec3;

	model?:   NJS_MODEL;
}

export interface NJS_GROUP {
	objects: NJS_OBJECT[];
}

export interface NJS_MOTION {
	frames:    number;

    flags:     number;

	positions: vec3[];
	rotations: vec3[];
	scales:    vec3[];
}

export interface NJS_ACTION {
    frames:  number;
	objects: NJS_OBJECT[];
	motions: NJS_MOTION[];
}

function readVec2(data: DataView, byteOffset: number = 0, littleEndian?: boolean): vec2 {
    return vec2.fromValues(
        data.getFloat32(byteOffset + 0x00, littleEndian),
        data.getFloat32(byteOffset + 0x04, littleEndian)
        );
}

function readVec3(data: DataView, byteOffset: number = 0, littleEndian?: boolean): vec3 {
    return vec3.fromValues(
        data.getFloat32(byteOffset + 0x00, littleEndian),
        data.getFloat32(byteOffset + 0x04, littleEndian),
        data.getFloat32(byteOffset + 0x08, littleEndian)
        );
}

function readVec4(data: DataView, byteOffset: number = 0, littleEndian?: boolean): vec4 {
    return vec4.fromValues(
        data.getFloat32(byteOffset + 0x00, littleEndian),
        data.getFloat32(byteOffset + 0x04, littleEndian),
        data.getFloat32(byteOffset + 0x08, littleEndian),
        data.getFloat32(byteOffset + 0x0C, littleEndian),
        );
}

function readRot32(data: DataView, byteOffset: number = 0, littleEndian?: boolean): vec3 {
    let rotation = vec3.fromValues(
        data.getInt16(byteOffset + 0x00, littleEndian),
        data.getInt16(byteOffset + 0x04, littleEndian),
        data.getInt16(byteOffset + 0x08, littleEndian)
    );
    vec3.scale(rotation, rotation, Math.PI / 32768.0);

    return rotation;
}

function readRot16(data: DataView, byteOffset: number = 0, littleEndian?: boolean): vec3 {
    let rotation = vec3.fromValues(
        data.getInt16(byteOffset + 0x00, littleEndian),
        data.getInt16(byteOffset + 0x02, littleEndian),
        data.getInt16(byteOffset + 0x04, littleEndian)
    );
    vec3.scale(rotation, rotation, Math.PI / 32768.0);

    return rotation;
}


function expand4to8(n: number) {
    return (n << 4) | n;
}

function expand5to8(n: number) {
    return (n << (8 - 5)) | (n >>> (10 - 8));
}

function expand6to8(n: number) {
    return (n << (8 - 6)) | (n >>> (12 - 8));
}

function expand10toFloat(n: number) {
    return (n - 0x1FF) / 0x1FF;
}

function colorFromRGB565(dst: Color, n: number): void {
    dst.a = 1.0;
    dst.r = expand5to8((n & 0xF800) >>> 11) / 0xFF;
    dst.g = expand6to8((n & 0x07E0) >>>  5) / 0xFF;
    dst.b = expand5to8((n & 0x001F) >>>  0) / 0xFF;
}

function colorNewFromRGB565(n: number): Color {
    const dst = colorNewFromRGBA(0, 0, 0, 0);
    colorFromRGB565(dst, n);
    return dst;
}

function colorFromARGB1555(dst: Color, n: number): void {
    dst.a = (n & 0x8000) ? 1.0 : 0.0;
    dst.r = expand5to8((n & 0x7C00) >>> 10) / 0xFF;
    dst.g = expand5to8((n & 0x03E0) >>>  5) / 0xFF;
    dst.b = expand5to8((n & 0x001F) >>>  0) / 0xFF;
}

function colorNewFromARGB1555(n: number): Color {
    const dst = colorNewFromRGBA(0, 0, 0, 0);
    colorFromARGB1555(dst, n);
    return dst;
}

function colorFromARGB4444(dst: Color, n: number): void {
    dst.a = expand4to8((n & 0xF000) >>> 12) / 0xFF;
    dst.r = expand4to8((n & 0x0F00) >>>  8) / 0xFF;
    dst.g = expand4to8((n & 0x00F0) >>>  4) / 0xFF;
    dst.b = expand4to8((n & 0x000F) >>>  0) / 0xFF;
}

function colorNewFromARGB4444(n: number): Color {
    const dst = colorNewFromRGBA(0, 0, 0, 0);
    colorFromARGB4444(dst, n);
    return dst;
}

function colorFromA2RGB10(dst: Color, n: number): void {
    dst.a = expand4to8((n & 0xC0000000) >>> 30) / 0x003;
    dst.r = expand4to8((n & 0x3FF00000) >>> 20) / 0x3FF;
    dst.g = expand4to8((n & 0x000FFC00) >>> 10) / 0x3FF;
    dst.b = expand4to8((n & 0x000003FF) >>>  0) / 0x3FF;
}

function colorNewFromA2RGB10(n: number): Color {
    const dst = colorNewFromRGBA(0, 0, 0, 0);
    colorFromA2RGB10(dst, n);
    return dst;
}

function vec3FromA2RGB10(dst: vec3, n: number): void {
    dst[0] = expand10toFloat((n & 0x3FF00000) >>> 20);
    dst[1] = expand10toFloat((n & 0x000FFC00) >>> 10);
    dst[2] = expand10toFloat((n & 0x000003FF) >>>  0);
}

function vec3NewFromA2RGB10(n: number): vec3 {
    const dst = vec3.create();
    vec3FromA2RGB10(dst, n);
    return dst;
}

function parseOffset(offset: number, baseOffset: number): number {
    var adjustedOffset = offset - baseOffset;
    return (adjustedOffset < 0) ? -1 : adjustedOffset;
}

const enum CNK_TYPE {
    CNK_NULL  =   0,
    CNK_BITS  =   1,
    CNK_TINY  =   8,
    CNK_MAT   =  16,
    CNK_VERT  =  32,
    CNK_VOL   =  56,
    CNK_STRIP =  64,
    CNK_END   = 255,
}

function parseChunkList(buffer: ArrayBufferSlice, offs: number, callback: (type: CNK_TYPE, header: number, flags: number, extra: number | undefined, data: ArrayBufferSlice | undefined) => void) {
    let type = CNK_TYPE.CNK_END;

    const view = buffer.createDataView();
    while (true) {
        const header = view.getUint8(offs++);
        const flags = view.getUint8(offs++);
        let extra = undefined;
        let data: ArrayBufferSlice | undefined;

        if (header == 0x00) {
            type = CNK_TYPE.CNK_NULL;
        } else if (header == 0xFF) {
            type = CNK_TYPE.CNK_END;
        }

        if (header < 8) {
            type = CNK_TYPE.CNK_BITS;
        } else if (header < 16) {
            const texId = extra = view.getUint16(offs, true);
            offs += 0x02;
            type = CNK_TYPE.CNK_TINY;
        } else {
            const size = extra = view.getUint16(offs, true);
            offs += 0x02;

            let isVert = false;

            if (header < 32) {
                type = CNK_TYPE.CNK_MAT;
            } else if (header < 56) {
                isVert = true;
                type = CNK_TYPE.CNK_VERT;
            } else if (header < 64) {
                type = CNK_TYPE.CNK_VOL;
            } else if (header < 255) {
                type = CNK_TYPE.CNK_STRIP;
            }

            const chunkSize = (type === CNK_TYPE.CNK_VERT) ? size << 2 : size << 1;
            data = buffer.subarray(offs, chunkSize);
            offs += chunkSize;
        }

        callback(type, header, flags, extra, data);

        if (type === CNK_TYPE.CNK_END)
            break;
    }
}

enum CNK_FMT {
    FMT_NONE,
    FMT_V3,
    FMT_V4,
    FMT_VNX,
    FMT_D8,
    FMT_S5,
    FMT_S4,
    FMT_IN,
    FMT_UF,
    FMT_NF,
};

function parseNjsVlist(buffer: ArrayBufferSlice, offset: number): NJS_VERTS {
    const positions: vec3[] = [];
    const normals:   vec3[] = [];
    const diffuse:   Color[] = [];
    const specular:  Color[] = [];

    const processVlistChunks = (type: CNK_TYPE, header: number, flags: number, extra: number | undefined, data: ArrayBufferSlice | undefined): void => {
        if (type != CNK_TYPE.CNK_VERT || data === undefined)
            return;

        const view = data.createDataView();

        const indexOffset = view.getUint16(0x00, true);
        const vertexCount = view.getUint16(0x02, true);

        let vertexStride = 0; // Used as an offset currently
        let dataOffset = 0x04;

        let vertFormat = header - CNK_TYPE.CNK_VERT;
        let positionFormat   = CNK_FMT.FMT_V3;
        let normalFormat     = CNK_FMT.FMT_NONE;
        let diffuseFormat    = CNK_FMT.FMT_NONE;
        let specularFormat   = CNK_FMT.FMT_NONE;
        let userFlagsFormat  = CNK_FMT.FMT_NONE;
        let ninjaFlagsFormat = CNK_FMT.FMT_NONE;

        for (let i = 0; i < vertexCount; ++i) {
            vertexStride = 0x00;

            if (vertFormat < 2) {
                positions.push(readVec3(view, dataOffset + vertexStride, true));

                positionFormat = CNK_FMT.FMT_V4;
                vertexStride += 0x10;

                if (vertFormat == 1) {
                    normals.push(readVec3(view, dataOffset + vertexStride, true));

                    normalFormat = CNK_FMT.FMT_V4;
                    vertexStride += 0x10;
                }
            } else {
                positions.push(readVec3(view, dataOffset + vertexStride, true));

                positionFormat = CNK_FMT.FMT_V3;
                vertexStride += 0x0C;

                let format = vertFormat;
                if (format < 9) {
                    format -= 2;
                } else if (format < 16) {
                    format -= 9;

                    normals.push(readVec3(view, dataOffset + vertexStride, true));

                    normalFormat = CNK_FMT.FMT_V3;
                    vertexStride += 0x0C;
                } else {
                    format -= 15;

                    const normalValue = vec3NewFromA2RGB10(view.getUint32(dataOffset + vertexStride, true));
                    vec3.normalize(normalValue, normalValue);
                    normals.push(normalValue);

                    normalFormat = CNK_FMT.FMT_VNX;
                    vertexStride += 0x04;
                }

                if (format === 1) {
                    diffuse.push(colorNewFromARGB8(view.getUint32(dataOffset + vertexStride, true)));
                    diffuseFormat = CNK_FMT.FMT_D8;
                    vertexStride += 4;
                } else if (format === 2) {
                    const userFlags = view.getUint32(dataOffset + vertexStride, true);
                    userFlagsFormat = CNK_FMT.FMT_UF;
                    vertexStride += 4;
                } else if (format === 3) {
                    const ninjaFlags = view.getUint32(dataOffset + vertexStride, true);
                    ninjaFlagsFormat = CNK_FMT.FMT_NF;
                    vertexStride += 4;
                } else if (format === 4) {
                    diffuse.push(colorNewFromRGB565(view.getUint16(dataOffset + vertexStride + 0x00, true)));
                    specular.push(colorNewFromRGB565(view.getUint16(dataOffset + vertexStride + 0x02, true)));
                    diffuseFormat = CNK_FMT.FMT_S5;
                    specularFormat = CNK_FMT.FMT_S5;
                    vertexStride += 4;
                } else if (format === 5) {
                    diffuse.push(colorNewFromARGB4444(view.getUint16(dataOffset + vertexStride + 0x00, true)));
                    specular.push(colorNewFromRGB565(view.getUint16(dataOffset + vertexStride + 0x02, true)));
                    diffuseFormat = CNK_FMT.FMT_S4;
                    specularFormat = CNK_FMT.FMT_S5;
                    vertexStride += 4;
                } else if (format === 6) {
                    const diffuseIntensity = view.getUint16(dataOffset + vertexStride + 0x00, true);
                    const specularIntensity = view.getUint16(dataOffset + vertexStride + 0x02, true);
                    diffuseFormat = CNK_FMT.FMT_IN;
                    specularFormat = CNK_FMT.FMT_IN;
                    vertexStride += 4;
                }
            }

            dataOffset += vertexStride;
        }
    }

    parseChunkList(buffer, offset, processVlistChunks);

    let stride = 0;
    if (positions.length > 0) stride += 3;
    if (normals.length > 0)   stride += 3;
    if (diffuse.length > 0)   stride += 4;
    if (specular.length > 0)  stride += 4;

    return {positions, normals, uvs: [], diffuse, specular};
}

function parseNjsPlist(buffer: ArrayBufferSlice, offset: number, vertices: NJS_VERTS): [NJS_MESHSET[], NJS_MESH[]] {
    const texture: NJS_TEXTURE = {texture: -1, flipU: 0, flipV: 0, clampU: 0, clampV: 0, superSample: 0, mipMapAdjust: 0, filterMode: 0};
    const material: NJS_MATERIAL = {diffuse: White, ambient: TransparentBlack, specular: TransparentBlack, srcAlpha: 0, dstAlpha: 0};
    const meshsets: NJS_MESHSET[] = [];

    const processPlistChunks = (type: CNK_TYPE, header: number, flags: number, extra: number | undefined, data: ArrayBufferSlice | undefined): void => {
        switch(type) {
            case CNK_TYPE.CNK_BITS:
                {
                    // TODO(jstpierre): Handle other BITS types.
                    const dstAlpha = (flags >>> 0) & 0x07;
                    const srcAlpha = (flags >>> 3) & 0x07;

                    material.dstAlpha = dstAlpha;
                    material.srcAlpha = srcAlpha;
                } break;
            case CNK_TYPE.CNK_TINY:
                {
                    const mipMapAdjust = (flags >>> 0) & 0x0F;
                    const clampU = (flags >>> 5) & 0x01;
                    const clampV = (flags >>> 4) & 0x01;
                    const flipU  = (flags >>> 7) & 0x01;
                    const flipV  = (flags >>> 6) & 0x01;
                    const texFlags = extra!;
                    const superSample = (texFlags >>> 13) & 0x01;
                    const filterMode = (texFlags >>> 14) & 0x03;

                    texture.texture = texFlags & 0x1FFF;
                    texture.clampU = clampU;
                    texture.clampV = clampV;
                    texture.flipU = flipU;
                    texture.flipV = flipV;
                    texture.superSample = superSample;
                    texture.filterMode = filterMode;
                    texture.mipMapAdjust = mipMapAdjust;
                } break;
            default:
                {
                    const view = data!.createDataView();
                    let dataOffset = 0;

                    switch(type) {
                        case CNK_TYPE.CNK_MAT:
                            {
                                const dstAlpha = (flags >>> 0) & 0x07;
                                const srcAlpha = (flags >>> 3) & 0x07;

                                material.dstAlpha = dstAlpha;
                                material.srcAlpha = srcAlpha;

                                if ((header & 0x01) !== 0) {
                                    const diffuse = view.getUint32(dataOffset, true);
                                    material.diffuse = colorNewFromARGB8(diffuse);

                                    dataOffset += 4;
                                }
                                if ((header & 0x02) !== 0) {
                                    const ambient = view.getUint32(dataOffset, true);
                                    material.ambient = colorNewFromARGB8(ambient);

                                    dataOffset += 4;
                                }
                                if ((header & 0x04) !== 0) {
                                    const specular = view.getUint32(dataOffset, true);
                                    material.specular = colorNewFromARGB8(specular);

                                    dataOffset += 4;
                                }
                            } break;
                        case CNK_TYPE.CNK_VOL:
                            {
                                ;
                            } break;
                        case CNK_TYPE.CNK_STRIP:
                            {
                                const stripType = header - type;
                                const stripFlags = flags;
                                const stripFormat = Math.trunc(stripType / 3);
                                const uvFormat = Math.trunc(stripType % 3);
                                const stripInfo = view.getUint16(dataOffset, true);
                                const stripCount = stripInfo & 0x3FFF;
                                const userOffset = (stripInfo >>> 14) << 4;

                                dataOffset += 0x02;

                                const tex = {...texture};
                                const mat = {...material};
                                mat.texture = tex;

                                const ignoreAmbient = (stripFlags & NJS_ATTRIBUTE_FLAGS.IGNORE_AMBIENT) != 0;
                                const ignoreSpecular = (stripFlags & NJS_ATTRIBUTE_FLAGS.IGNORE_SPECULAR) != 0;
                                if (ignoreAmbient) mat.ambient = TransparentBlack;
                                if (ignoreSpecular) mat.specular = TransparentBlack;

                                const meshset: NJS_MESHSET = {material: mat, type: stripType, flags: stripFlags, strips: []};
                                meshsets.push(meshset);

                                const strips: NJS_STRIP[] = meshset.strips;

                                for (let i = 0; i < stripCount; ++i) {
                                    const stripHeader = view.getInt16(dataOffset, true);
                                    const flip = stripHeader < 0;
                                    const indexCount = Math.abs(stripHeader);
                                    dataOffset += 0x02;

                                    const strip: NJS_STRIP = {flags: stripFlags, flip: flip, indices: [], normals: [], uvs: [], diffuse: []};
                                    strips.push(strip);

                                    for (let j = 0; j < indexCount; ++j) {
                                        const index = view.getUint16(dataOffset, true);
                                        dataOffset += 0x02;

                                        strip.indices.push(index);

                                        switch (uvFormat) {
                                            case 1: // UVN
                                            case 2: // UVH
                                            {
                                                const divisor = (uvFormat === 1) ? 256.0 : 1024.0;
                                                const u = view.getInt16(dataOffset + 0x00, true) / divisor;
                                                const v = view.getInt16(dataOffset + 0x02, true) / divisor;
                                                const uv = vec2.fromValues(u, v);
                                                strip.uvs.push(uv);

                                                dataOffset += 4;
                                            } break;
                                        }

                                        switch (stripFormat) {
                                            case 1: // D8
                                            {
                                                const diffuse = view.getUint32(dataOffset, true);
                                                strip.diffuse.push(colorNewFromARGB8(diffuse));

                                                dataOffset += 4;
                                            } break;
                                            case 2: // VN
                                            {
                                                const vnx = view.getInt16(dataOffset + 0x00, true) / 32767.0;
                                                const vny = view.getInt16(dataOffset + 0x02, true) / 32767.0;
                                                const vnz = view.getInt16(dataOffset + 0x04, true) / 32767.0;
                                                const normal = vec3.fromValues(vnx, vny, vnz);
                                                vec3.normalize(normal, normal);
                                                strip.normals.push(normal);

                                                dataOffset += 0x06;
                                            } break;
                                        }

                                        if (j >= 2) {
                                            // Skip User flags
                                            dataOffset += userOffset;
                                        }
                                    }
                                }
                            } break;
                    }
                } break;
        }
    }

    parseChunkList(buffer, offset, processPlistChunks);

    const meshes: NJS_MESH[] = [];

    const processMeshSet = (vlistVertices: NJS_VERTS, meshset: NJS_MESHSET): NJS_MESH => {
        const stripType = meshset.type;
        const stripFlags = meshset.flags;
        const stripFormat = Math.trunc(stripType / 3);
        const uvFormat = Math.trunc(stripType % 3);
        const isSimple = stripFormat == 0 && uvFormat == 0;
        const vertices: NJS_VERTS = isSimple ? vlistVertices : {positions: [], normals: [], uvs: [], diffuse: [], specular: []};
        const indices: number[] = [];

        const strips = meshset.strips;

        for (let strip of strips) {
            let flip = strip.flip;
            const index: number[] = [strip.indices[0], strip.indices[1], -1];
            for (let i = 2; i < strip.indices.length; ++i) {
                index[2] = strip.indices[i];

                if (isSimple) {
                    if (flip) {
                        consume(indices, [index[0], index[2], index[1]]);
                    } else {
                        consume(indices, [index[0], index[1], index[2]]);
                    }

                    const f0 = indices[indices.length - 3] + 1;
                    const f1 = indices[indices.length - 2] + 1;
                    const f2 = indices[indices.length - 1] + 1;
                } else {
                    const length = indices.length;
                    consume(indices, [length + 0, length + 1, length + 2]);

                    const vertexIndices = flip ? [index[0], index[2], index[1]] : [index[0], index[1], index[2]];
                    const stripIndices = flip ? [i - 2, i - 0, i - 1] : [i - 2, i - 1, i - 0];

                    // Positions
                    consume(vertices.positions, [vlistVertices.positions[vertexIndices[0]], vlistVertices.positions[vertexIndices[1]], vlistVertices.positions[vertexIndices[2]]]);
                    // Normals
                    if (strip.normals.length > 0) {
                        consume(vertices.normals, [strip.normals[stripIndices[0]], strip.normals[stripIndices[1]], strip.normals[stripIndices[2]]]);
                    } else if (vlistVertices.normals.length > 0) {
                        consume(vertices.normals, [vlistVertices.normals[vertexIndices[0]], vlistVertices.normals[vertexIndices[1]], vlistVertices.normals[vertexIndices[2]]]);
                    }
                    // UVs
                    if (strip.uvs.length > 0) {
                        consume(vertices.uvs, [strip.uvs[stripIndices[0]], strip.uvs[stripIndices[1]], strip.uvs[stripIndices[2]]]);
                    }
                    // Diffuse
                    if (strip.diffuse.length > 0) {
                        consume(vertices.diffuse, [strip.diffuse[stripIndices[0]], strip.diffuse[stripIndices[1]], strip.diffuse[stripIndices[2]]]);
                    } else if (vlistVertices.diffuse.length > 0) {
                        consume(vertices.diffuse, [vlistVertices.diffuse[vertexIndices[0]], vlistVertices.diffuse[vertexIndices[1]], vlistVertices.diffuse[vertexIndices[2]]]);
                    }
                    // Specular
                    if (vlistVertices.specular.length > 0) {
                        consume(vertices.specular, [vlistVertices.specular[vertexIndices[0]], vlistVertices.specular[vertexIndices[1]], vlistVertices.specular[vertexIndices[2]]]);
                    }
                }

                [index[0], index[1]] = [index[1], index[2]];
                flip = !flip;
            }
        }

        return {material: meshset.material, type: meshset.type, flags: meshset.flags, vertices, indices};
    }

    for (const meshset of meshsets) {
        const mesh = processMeshSet(vertices, meshset);
        meshes.push(mesh);
    }

    return [meshsets, meshes];
}

function parseNjsModel(buffer: ArrayBufferSlice, baseOffset: number, offset: number): NJS_MODEL {
    const view = buffer.createDataView();

    const vlistOffset = parseOffset(view.getUint32(offset + 0x00, true), baseOffset);
	const plistOffset = parseOffset(view.getUint32(offset + 0x04, true), baseOffset);
    const bounds = readVec4(view, offset + 0x08, true);

    const vertices: NJS_VERTS = parseNjsVlist(buffer, vlistOffset);
    const [polygons, meshes]: [NJS_MESHSET[], NJS_MESH[]] = parseNjsPlist(buffer, plistOffset, vertices);

    return { vertices, polygons, meshes, bounds };
}

function parseNjsObject(buffer: ArrayBufferSlice, baseOffset: number, offset: number, index: number, parent: number): NJS_OBJECT | undefined {
    const view = buffer.createDataView();

    const flags = view.getUint32(offset + 0x00, true);

	const child:    number = parseOffset(view.getUint32(offset + 0x2C, true), baseOffset);
	const sibling:  number = parseOffset(view.getUint32(offset + 0x30, true), baseOffset);

	const position: vec3 = readVec3(view, offset + 0x08, true);
	const rotation: vec3 = readRot32(view, offset + 0x14, true);
	const scale:    vec3 = readVec3(view, offset + 0x20, true);

    const modelOffset = parseOffset(view.getUint32(offset + 0x04, true), baseOffset);
   
    let model 
    if (modelOffset > 0) 
        model = parseNjsModel(buffer, baseOffset, modelOffset);   

    return { flags, index, parent, child, sibling, position, rotation, scale, model };
}

export function parseNjsObjects(buffer: ArrayBufferSlice, baseOffset: number, offset: number): NJS_OBJECT[] {
    const objects: NJS_OBJECT[] = [];
    const pending: number[]  = [offset];
    const parents: number[]  = [-1];
    const siblings: number[] = [-1];

    // Process objects in depth first order
    while (pending.length > 0) {
        const pendingOffset = pending.shift()!;
        const parent = parents.shift() ?? -1;
        const sibling = siblings.shift() ?? -1;
        const index = objects.length;

        // Parse current object
        const current = parseNjsObject(buffer, baseOffset, pendingOffset, index, parent);
        if (!current) {
            continue;
        }

        // Store current object
        objects.push(current);

        // Push sibling onto pending stack
        if (current.sibling >= 0) {
            siblings.unshift(index);
            parents.unshift(-1);
            pending.unshift(current.sibling);
        }

        // Push child onto pending stack
        if (current.child >= 0) {
            siblings.unshift(-1);
            parents.unshift(index);
            pending.unshift(current.child);
        }

        // Update parent child index
        if (parent >= 0) {
            objects[parent].child = index;
        }

        // Update sibling next index
        if (sibling >= 0) {
            current.parent = objects[sibling].parent;
            objects[sibling].sibling = index;
        }
    }

    return objects;
}

function parseNjsMotion(buffer: ArrayBufferSlice, baseOffset: number, offset: number, frames: number, rotationType: ROTATION_TYPE): NJS_MOTION {
    const view = buffer.createDataView();

    const flags = view.getUint16(offset + 0x00, true);
    const positionsOffset = parseOffset(view.getUint32(offset + 0x04, true), baseOffset);
    const rotationsOffset = parseOffset(view.getUint32(offset + 0x08, true), baseOffset);
    const scalesOffset = parseOffset(view.getUint32(offset + 0x0C, true), baseOffset);
    const positions: vec3[] = [];
    const rotations: vec3[] = [];
    const scales: vec3[] = [];

    if (positionsOffset >= 0) {
        for (let i = 0; i < frames; ++i) {
            const position = readVec3(view, positionsOffset + i * 0x0C, true);
            positions.push(position);
        }
    }

    if (rotationsOffset >= 0) {
        for (let i = 0; i < frames; ++i) {
            let rotation = vec3.create();

            switch (rotationType) {
                case ROTATION_TYPE.EULER_32:
                    {
                        break;
                    }
                case ROTATION_TYPE.QUATERNION:
                    {
                        break;
                    }
                case ROTATION_TYPE.EULER_16:
                    {
                        rotation = readRot16(view, rotationsOffset + i * 0x06, true);
                    }
            }

            rotations.push(rotation);
        }
    }

    if (scalesOffset >= 0) {
        for (let i = 0; i < frames; ++i) {
            const scale = readVec3(view, scalesOffset + i * 0x0C, true);
            scales.push(scale);
        }
    }

    return {frames, flags, positions, rotations, scales};
}

function parseNjsMotions(buffer: ArrayBufferSlice, baseOffset: number, offset: number, objectCount: number): [number, NJS_MOTION[]] {
    const view = buffer.createDataView();

    const motionType = view.getUint16(offset + 0x00, true);
    const rotationType = rotationTypes[motionType];
    const frames = view.getUint16(offset + 0x02, true);
    const motionsOffset = parseOffset(view.getUint32(offset + 0x04, true), baseOffset);
    const motions: NJS_MOTION[] = [];

    if (motionsOffset >= 0) {
        for (let i = 0; i < objectCount; ++i) {
            const motion = parseNjsMotion(buffer, baseOffset, motionsOffset + i * 0x10, frames, rotationType);
            motions.push(motion);
        }
    }

    return [frames, motions];
}

export function parseNjsAction(buffer: ArrayBufferSlice, baseOffset: number, offset: number): NJS_ACTION {
    const view = buffer.createDataView();

    const objectsOffset = parseOffset(view.getUint32(offset + 0x00, true), baseOffset);
    const motionsOffset = parseOffset(view.getUint32(offset + 0x04, true), baseOffset);

    const objects: NJS_OBJECT[] = parseNjsObjects(buffer, baseOffset, objectsOffset);
    const [frames, motions]: [number, NJS_MOTION[]] = parseNjsMotions(buffer, baseOffset, motionsOffset, objects.length);

    return {frames, objects, motions}
}