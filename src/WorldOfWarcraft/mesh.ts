export enum SkyboxColor {
    Top = 0,
    Middle = 1,
    Band1 = 2,
    Band2 = 3,
    Smog = 4,
    Fog = 5,
}

export const skyboxVertices: Float32Array = new Float32Array([
    0, 0, 0.2928932309150696, SkyboxColor.Top,
    0, 0.4903479814529419, 0.13914519548416138, SkyboxColor.Middle,
    0.12691140174865723, 0.4736397862434387, 0.13914519548416138, SkyboxColor.Middle,
    0.24517399072647095, 0.4246537685394287, 0.13914519548416138, SkyboxColor.Middle,
    0.3467283844947815, 0.3467283844947815, 0.13914519548416138, SkyboxColor.Middle,
    0.4246538281440735, 0.24517402052879333, 0.13914519548416138, SkyboxColor.Middle,
    0.4736397862434387, 0.1269114464521408, 0.13914519548416138, SkyboxColor.Middle,
    0.4903479516506195, -4.286758326088602e-8, 0.13914519548416138, SkyboxColor.Middle,
    0.4736397862434387, -0.12691152095794678, 0.13914519548416138, SkyboxColor.Middle,
    0.4246537685394287, -0.2451740801334381, 0.13914519548416138, SkyboxColor.Middle,
    0.3467283844947815, -0.34672844409942627, 0.13914519548416138, SkyboxColor.Middle,
    0.24517402052879333, -0.4246538281440735, 0.13914519548416138, SkyboxColor.Middle,
    0.12691132724285126, -0.4736397862434387, 0.13914519548416138, SkyboxColor.Middle,
    -4.286758326088602e-8, -0.4903479516506195, 0.13914519548416138, SkyboxColor.Middle,
    -0.12691141664981842, -0.4736397862434387, 0.13914519548416138, SkyboxColor.Middle,
    -0.2451740801334381, -0.42465370893478394, 0.13914519548416138, SkyboxColor.Middle,
    -0.34672844409942627, -0.34672826528549194, 0.13914519548416138, SkyboxColor.Middle,
    -0.4246538281440735, -0.2451738715171814, 0.13914519548416138, SkyboxColor.Middle,
    -0.4736397862434387, -0.12691129744052887, 0.13914519548416138, SkyboxColor.Middle,
    -0.4903479516506195, 8.573516652177204e-8, 0.13914519548416138, SkyboxColor.Middle,
    -0.4736397862434387, 0.126911461353302, 0.13914519548416138, SkyboxColor.Middle,
    -0.4246538281440735, 0.24517402052879333, 0.13914519548416138, SkyboxColor.Middle,
    -0.34672826528549194, 0.3467285633087158, 0.13914519548416138, SkyboxColor.Middle,
    -0.2451738715171814, 0.42465388774871826, 0.13914519548416138, SkyboxColor.Middle,
    -0.12691129744052887, 0.4736398458480835, 0.13914519548416138, SkyboxColor.Middle,
    0, 0.5679999589920044, 0.08489322662353516, SkyboxColor.Band1,
    0.1470092087984085, 0.5486457943916321, 0.08489322662353516, SkyboxColor.Band1,
    0.2839999794960022, 0.49190235137939453, 0.08489322662353516, SkyboxColor.Band1,
    0.40163663029670715, 0.40163663029670715, 0.08489322662353516, SkyboxColor.Band1,
    0.4919024109840393, 0.2840000092983246, 0.08489322662353516, SkyboxColor.Band1,
    0.5486457943916321, 0.1470092535018921, 0.08489322662353516, SkyboxColor.Band1,
    0.5679998993873596, -4.965613342733377e-8, 0.08489322662353516, SkyboxColor.Band1,
    0.5486457943916321, -0.14700935781002045, 0.08489322662353516, SkyboxColor.Band1,
    0.49190235137939453, -0.28400006890296936, 0.08489322662353516, SkyboxColor.Band1,
    0.40163663029670715, -0.40163668990135193, 0.08489322662353516, SkyboxColor.Band1,
    0.2840000092983246, -0.4919024109840393, 0.08489322662353516, SkyboxColor.Band1,
    0.14700911939144135, -0.5486457943916321, 0.08489322662353516, SkyboxColor.Band1,
    -4.965613342733377e-8, -0.5679998993873596, 0.08489322662353516, SkyboxColor.Band1,
    -0.1470092236995697, -0.5486457943916321, 0.08489322662353516, SkyboxColor.Band1,
    -0.28400006890296936, -0.49190229177474976, 0.08489322662353516, SkyboxColor.Band1,
    -0.40163668990135193, -0.4016364812850952, 0.08489322662353516, SkyboxColor.Band1,
    -0.4919024109840393, -0.28399983048439026, 0.08489322662353516, SkyboxColor.Band1,
    -0.5486457943916321, -0.14700908958911896, 0.08489322662353516, SkyboxColor.Band1,
    -0.5679998993873596, 9.931226685466754e-8, 0.08489322662353516, SkyboxColor.Band1,
    -0.5486457943916321, 0.14700926840305328, 0.08489322662353516, SkyboxColor.Band1,
    -0.4919024109840393, 0.2840000092983246, 0.08489322662353516, SkyboxColor.Band1,
    -0.4016364812850952, 0.4016368091106415, 0.08489322662353516, SkyboxColor.Band1,
    -0.28399983048439026, 0.49190250039100647, 0.08489322662353516, SkyboxColor.Band1,
    -0.14700908958911896, 0.5486459136009216, 0.08489322662353516, SkyboxColor.Band1,
    0, 0.6413320302963257, 0.024161219596862793, SkyboxColor.Band2,
    0.16598893702030182, 0.6194791793823242, 0.024161219596862793, SkyboxColor.Band2,
    0.32066601514816284, 0.5554097890853882, 0.024161219596862793, SkyboxColor.Band2,
    0.4534902274608612, 0.4534902274608612, 0.024161219596862793, SkyboxColor.Band2,
    0.555409848690033, 0.32066604495048523, 0.024161219596862793, SkyboxColor.Band2,
    0.6194791793823242, 0.1659889966249466, 0.024161219596862793, SkyboxColor.Band2,
    0.6413319706916809, -5.606702657701135e-8, 0.024161219596862793, SkyboxColor.Band2,
    0.6194791793823242, -0.16598911583423615, 0.024161219596862793, SkyboxColor.Band2,
    0.5554097890853882, -0.3206661343574524, 0.024161219596862793, SkyboxColor.Band2,
    0.4534902274608612, -0.453490287065506, 0.024161219596862793, SkyboxColor.Band2,
    0.32066604495048523, -0.555409848690033, 0.024161219596862793, SkyboxColor.Band2,
    0.16598884761333466, -0.6194791793823242, 0.024161219596862793, SkyboxColor.Band2,
    -5.606702657701135e-8, -0.6413319706916809, 0.024161219596862793, SkyboxColor.Band2,
    -0.1659889668226242, -0.6194791793823242, 0.024161219596862793, SkyboxColor.Band2,
    -0.3206661343574524, -0.5554097294807434, 0.024161219596862793, SkyboxColor.Band2,
    -0.453490287065506, -0.45349007844924927, 0.024161219596862793, SkyboxColor.Band2,
    -0.555409848690033, -0.3206658661365509, 0.024161219596862793, SkyboxColor.Band2,
    -0.6194791793823242, -0.16598880290985107, 0.024161219596862793, SkyboxColor.Band2,
    -0.6413319706916809, 1.121340531540227e-7, 0.024161219596862793, SkyboxColor.Band2,
    -0.6194791793823242, 0.16598902642726898, 0.024161219596862793, SkyboxColor.Band2,
    -0.555409848690033, 0.32066604495048523, 0.024161219596862793, SkyboxColor.Band2,
    -0.45349007844924927, 0.4534904360771179, 0.024161219596862793, SkyboxColor.Band2,
    -0.3206658661365509, 0.5554099082946777, 0.024161219596862793, SkyboxColor.Band2,
    -0.16598880290985107, 0.619479238986969, 0.024161219596862793, SkyboxColor.Band2,
    0, 0.6530885696411133, 0.013454735279083252, SkyboxColor.Smog,
    0.1690317541360855, 0.6308351159095764, 0.013454735279083252, SkyboxColor.Smog,
    0.32654428482055664, 0.5655912160873413, 0.013454735279083252, SkyboxColor.Smog,
    0.4618033468723297, 0.4618033468723297, 0.013454735279083252, SkyboxColor.Smog,
    0.5655913352966309, 0.32654431462287903, 0.013454735279083252, SkyboxColor.Smog,
    0.6308351159095764, 0.16903181374073029, 0.013454735279083252, SkyboxColor.Smog,
    0.6530885100364685, -5.7094815986147296e-8, 0.013454735279083252, SkyboxColor.Smog,
    0.6308351159095764, -0.16903193295001984, 0.013454735279083252, SkyboxColor.Smog,
    0.5655912160873413, -0.3265444040298462, 0.013454735279083252, SkyboxColor.Smog,
    0.4618033468723297, -0.4618034362792969, 0.013454735279083252, SkyboxColor.Smog,
    0.32654431462287903, -0.5655913352966309, 0.013454735279083252, SkyboxColor.Smog,
    0.16903166472911835, -0.6308351159095764, 0.013454735279083252, SkyboxColor.Smog,
    -5.7094815986147296e-8, -0.6530885100364685, 0.013454735279083252, SkyboxColor.Smog,
    -0.1690317839384079, -0.6308351159095764, 0.013454735279083252, SkyboxColor.Smog,
    -0.3265444040298462, -0.5655911564826965, 0.013454735279083252, SkyboxColor.Smog,
    -0.4618034362792969, -0.4618031978607178, 0.013454735279083252, SkyboxColor.Smog,
    -0.5655913352966309, -0.3265441358089447, 0.013454735279083252, SkyboxColor.Smog,
    -0.6308351159095764, -0.16903162002563477, 0.013454735279083252, SkyboxColor.Smog,
    -0.6530885100364685, 1.1418963197229459e-7, 0.013454735279083252, SkyboxColor.Smog,
    -0.6308351159095764, 0.16903184354305267, 0.013454735279083252, SkyboxColor.Smog,
    -0.5655913352966309, 0.32654431462287903, 0.013454735279083252, SkyboxColor.Smog,
    -0.4618031978607178, 0.4618035852909088, 0.013454735279083252, SkyboxColor.Smog,
    -0.3265441358089447, 0.5655913949012756, 0.013454735279083252, SkyboxColor.Smog,
    -0.16903162002563477, 0.6308351755142212, 0.013454735279083252, SkyboxColor.Smog,
    0, 0.6875, -0.004999999888241291, SkyboxColor.Fog,
    0.1779380887746811, 0.6640740036964417, -0.004999999888241291, SkyboxColor.Fog,
    0.34375, 0.5953924059867859, -0.004999999888241291, SkyboxColor.Fog,
    0.48613590002059937, 0.48613590002059937, -0.004999999888241291, SkyboxColor.Fog,
    0.5953924655914307, 0.3437500298023224, -0.004999999888241291, SkyboxColor.Fog,
    0.6640740036964417, 0.17793814837932587, -0.004999999888241291, SkyboxColor.Fog,
    0.6874999403953552, -6.010316155879991e-8, -0.004999999888241291, SkyboxColor.Fog,
    0.6640740036964417, -0.1779382824897766, -0.004999999888241291, SkyboxColor.Fog,
    0.5953924059867859, -0.34375011920928955, -0.004999999888241291, SkyboxColor.Fog,
    0.48613590002059937, -0.48613598942756653, -0.004999999888241291, SkyboxColor.Fog,
    0.3437500298023224, -0.5953924655914307, -0.004999999888241291, SkyboxColor.Fog,
    0.17793798446655273, -0.6640740036964417, -0.004999999888241291, SkyboxColor.Fog,
    -6.010316155879991e-8, -0.6874999403953552, -0.004999999888241291, SkyboxColor.Fog,
    -0.17793811857700348, -0.6640740036964417, -0.004999999888241291, SkyboxColor.Fog,
    -0.34375011920928955, -0.5953923463821411, -0.004999999888241291, SkyboxColor.Fog,
    -0.48613598942756653, -0.4861357510089874, -0.004999999888241291, SkyboxColor.Fog,
    -0.5953924655914307, -0.3437498211860657, -0.004999999888241291, SkyboxColor.Fog,
    -0.6640740036964417, -0.17793795466423035, -0.004999999888241291, SkyboxColor.Fog,
    -0.6874999403953552, 1.2020632311759982e-7, -0.004999999888241291, SkyboxColor.Fog,
    -0.6640740036964417, 0.17793817818164825, -0.004999999888241291, SkyboxColor.Fog,
    -0.5953924655914307, 0.3437500298023224, -0.004999999888241291, SkyboxColor.Fog,
    -0.4861357510089874, 0.48613613843917847, -0.004999999888241291, SkyboxColor.Fog,
    -0.3437498211860657, 0.5953925848007202, -0.004999999888241291, SkyboxColor.Fog,
    -0.17793795466423035, 0.6640740633010864, -0.004999999888241291, SkyboxColor.Fog,
     0,  0,  -1.7071068286895752, SkyboxColor.Fog,
]);

export const skyboxIndices = new Uint16Array([
    0,  1,  0,
    2,  0,  3,
    0,  4,  0,
    5,  0,  6,
    0,  7,  0,
    8,  0,  9,
    0,  10,  0,
    11,  0,  12,
    0,  13,  0,
    14,  0,  15,
    0,  16,  0,
    17,  0,  18,
    0,  19,  0,
    20,  0,  21,
    0,  22,  0,
    23,  0,  24,
    0,  1,  1,
    25,  2,  26,
    3,  27,  4,
    28,  5,  29,
    6,  30,  7,
    31,  8,  32,
    9,  33,  10,
    34,  11,  35,
    12,  36,  13,
    37,  14,  38,
    15,  39,  16,
    40,  17,  41,
    18,  42,  19,
    43,  20,  44,
    21,  45,  22,
    46,  23,  47,
    24,  48,  1,
    25,  25,  49,
    26,  50,  27,
    51,  28,  52,
    29,  53,  30,
    54,  31,  55,
    32,  56,  33,
    57,  34,  58,
    35,  59,  36,
    60,  37,  61,
    38,  62,  39,
    63,  40,  64,
    41,  65,  42,
    66,  43,  67,
    44,  68,  45,
    69,  46,  70,
    47,  71,  48,
    72,  25,  49,
    49,  73,  50,
    74,  51,  75,
    52,  76,  53,
    77,  54,  78,
    55,  79,  56,
    80,  57,  81,
    58,  82,  59,
    83,  60,  84,
    61,  85,  62,
    86,  63,  87,
    64,  88,  65,
    89,  66,  90,
    67,  91,  68,
    92,  69,  93,
    70,  94,  71,
    95,  72,  96,
    49,  73,  73,
    97,  74,  98,
    75,  99,  76,
    100,  77,  101,
    78,  102,  79,
    103,  80,  104,
    81,  105,  82,
    106,  83,  107,
    84,  108,  85,
    109,  86,  110,
    87,  111,  88,
    112,  89,  113,
    90,  114,  91,
    115,  92,  116,
    93,  117,  94,
    118,  95,  119,
    96,  120,  73,
    97,  97,  121,
    98,  121,  99,
    121,  100,  121,
    101,  121,  102,
    121,  103,  121,
    104,  121,  105,
    121,  106,  121,
    107,  121,  108,
    121,  109,  121,
    110,  121,  111,
    121,  112,  121,
    113,  121,  114,
    121,  115,  121,
    116,  121,  117,
    121,  118,  121,
    119,  121,  120,
    121,  97,  121,
]);

export const loadingAdtVertices: Float32Array = new Float32Array([
-1, -1, 1,
1, -1, 1,
1, 1, 1,
-1, 1, 1,
-1, -1, -1,
1, -1, -1,
1, 1, -1,
-1, 1, -1
]);

export const loadingAdtIndices = new Uint16Array([
0, 1, 2, 2, 3, 0, 1, 5, 6, 6, 2, 1, 7, 6, 5, 5, 4, 7, 4, 0, 3, 3, 7, 4, 4, 5, 1, 1, 0, 4, 3, 2, 6, 6, 7, 3
]);
