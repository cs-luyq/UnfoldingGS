// Quantitative comparison table from the supplied camera-ready paper. Dataset -> LOD -> method.
// Method order: 3DGS, Octree-GS, LapisGS, Ours. Sizes are in MB.
window.UNFOLDING_RESULTS = {
  "mip": [
    [
      {
        "psnr": 18.39,
        "ssim": 0.465,
        "lpips": 0.38,
        "fps": 189,
        "size": 99.41
      },
      {
        "psnr": 17.44,
        "ssim": 0.447,
        "lpips": 0.446,
        "fps": 180,
        "size": 12.4
      },
      {
        "psnr": 28.1,
        "ssim": 0.869,
        "lpips": 0.117,
        "fps": 151,
        "size": 304.24
      },
      {
        "psnr": 28.02,
        "ssim": 0.86,
        "lpips": 0.134,
        "fps": 183,
        "size": 9.79
      }
    ],
    [
      {
        "psnr": 20.9,
        "ssim": 0.588,
        "lpips": 0.319,
        "fps": 163,
        "size": 198.82
      },
      {
        "psnr": 20.85,
        "ssim": 0.585,
        "lpips": 0.34,
        "fps": 138,
        "size": 45.77
      },
      {
        "psnr": 27.56,
        "ssim": 0.837,
        "lpips": 0.157,
        "fps": 109,
        "size": 730.14
      },
      {
        "psnr": 27.64,
        "ssim": 0.842,
        "lpips": 0.165,
        "fps": 158,
        "size": 27.65
      }
    ],
    [
      {
        "psnr": 25.18,
        "ssim": 0.772,
        "lpips": 0.221,
        "fps": 142,
        "size": 397.63
      },
      {
        "psnr": 25.34,
        "ssim": 0.766,
        "lpips": 0.23,
        "fps": 128,
        "size": 87.72
      },
      {
        "psnr": 26.84,
        "ssim": 0.79,
        "lpips": 0.215,
        "fps": 82,
        "size": 1238.74
      },
      {
        "psnr": 26.95,
        "ssim": 0.796,
        "lpips": 0.219,
        "fps": 130,
        "size": 62.79
      }
    ],
    [
      {
        "psnr": 26.86,
        "ssim": 0.793,
        "lpips": 0.226,
        "fps": 107,
        "size": 795.26
      },
      {
        "psnr": 27.1,
        "ssim": 0.791,
        "lpips": 0.23,
        "fps": 114,
        "size": 103.61
      },
      {
        "psnr": 26.19,
        "ssim": 0.748,
        "lpips": 0.278,
        "fps": 70,
        "size": 1740.1
      },
      {
        "psnr": 27.17,
        "ssim": 0.79,
        "lpips": 0.224,
        "fps": 118,
        "size": 90.11
      }
    ]
  ],
  "bungee": [
    [
      {
        "psnr": 17.05,
        "ssim": 0.473,
        "lpips": 0.384,
        "fps": 157,
        "size": 204.59
      },
      {
        "psnr": 19.2,
        "ssim": 0.594,
        "lpips": 0.293,
        "fps": 132,
        "size": 60.76
      },
      {
        "psnr": 26.23,
        "ssim": 0.886,
        "lpips": 0.108,
        "fps": 158,
        "size": 253.82
      },
      {
        "psnr": 27.23,
        "ssim": 0.912,
        "lpips": 0.106,
        "fps": 159,
        "size": 27.36
      }
    ],
    [
      {
        "psnr": 18.77,
        "ssim": 0.596,
        "lpips": 0.311,
        "fps": 140,
        "size": 409.18
      },
      {
        "psnr": 20.98,
        "ssim": 0.694,
        "lpips": 0.231,
        "fps": 105,
        "size": 197.18
      },
      {
        "psnr": 26.17,
        "ssim": 0.879,
        "lpips": 0.13,
        "fps": 129,
        "size": 470.34
      },
      {
        "psnr": 27.13,
        "ssim": 0.901,
        "lpips": 0.116,
        "fps": 133,
        "size": 59.04
      }
    ],
    [
      {
        "psnr": 23.87,
        "ssim": 0.828,
        "lpips": 0.166,
        "fps": 96,
        "size": 818.36
      },
      {
        "psnr": 24.53,
        "ssim": 0.841,
        "lpips": 0.154,
        "fps": 96,
        "size": 269.57
      },
      {
        "psnr": 25.12,
        "ssim": 0.835,
        "lpips": 0.185,
        "fps": 88,
        "size": 840.79
      },
      {
        "psnr": 26.84,
        "ssim": 0.884,
        "lpips": 0.138,
        "fps": 97,
        "size": 115.79
      }
    ],
    [
      {
        "psnr": 26.95,
        "ssim": 0.883,
        "lpips": 0.138,
        "fps": 78,
        "size": 1636.72
      },
      {
        "psnr": 27.34,
        "ssim": 0.89,
        "lpips": 0.13,
        "fps": 86,
        "size": 313.61
      },
      {
        "psnr": 23.95,
        "ssim": 0.766,
        "lpips": 0.265,
        "fps": 80,
        "size": 1400.15
      },
      {
        "psnr": 27.61,
        "ssim": 0.893,
        "lpips": 0.128,
        "fps": 90,
        "size": 135.42
      }
    ]
  ],
  "deep": [
    [
      {
        "psnr": 20.55,
        "ssim": 0.614,
        "lpips": 0.324,
        "fps": 191,
        "size": 87.97
      },
      {
        "psnr": 22.56,
        "ssim": 0.72,
        "lpips": 0.282,
        "fps": 182,
        "size": 12.8
      },
      {
        "psnr": 19.99,
        "ssim": 0.569,
        "lpips": 0.374,
        "fps": 125,
        "size": 554.02
      },
      {
        "psnr": 27.95,
        "ssim": 0.861,
        "lpips": 0.142,
        "fps": 188,
        "size": 5.95
      }
    ],
    [
      {
        "psnr": 24.28,
        "ssim": 0.764,
        "lpips": 0.218,
        "fps": 166,
        "size": 175.94
      },
      {
        "psnr": 27.38,
        "ssim": 0.858,
        "lpips": 0.14,
        "fps": 137,
        "size": 48.72
      },
      {
        "psnr": 21.0,
        "ssim": 0.637,
        "lpips": 0.349,
        "fps": 82,
        "size": 1214.11
      },
      {
        "psnr": 28.44,
        "ssim": 0.869,
        "lpips": 0.138,
        "fps": 165,
        "size": 13.1
      }
    ],
    [
      {
        "psnr": 28.29,
        "ssim": 0.874,
        "lpips": 0.148,
        "fps": 143,
        "size": 351.89
      },
      {
        "psnr": 29.57,
        "ssim": 0.897,
        "lpips": 0.134,
        "fps": 136,
        "size": 54.36
      },
      {
        "psnr": 22.55,
        "ssim": 0.746,
        "lpips": 0.309,
        "fps": 65,
        "size": 2067.72
      },
      {
        "psnr": 29.76,
        "ssim": 0.894,
        "lpips": 0.136,
        "fps": 154,
        "size": 22.91
      }
    ],
    [
      {
        "psnr": 29.37,
        "ssim": 0.901,
        "lpips": 0.192,
        "fps": 112,
        "size": 703.77
      },
      {
        "psnr": 30.01,
        "ssim": 0.9,
        "lpips": 0.196,
        "fps": 135,
        "size": 56.34
      },
      {
        "psnr": 24.22,
        "ssim": 0.834,
        "lpips": 0.288,
        "fps": 58,
        "size": 3032.85
      },
      {
        "psnr": 29.99,
        "ssim": 0.903,
        "lpips": 0.188,
        "fps": 142,
        "size": 37.65
      }
    ]
  ],
  "tanks": [
    [
      {
        "psnr": 15.1,
        "ssim": 0.492,
        "lpips": 0.347,
        "fps": 202,
        "size": 52.74
      },
      {
        "psnr": 12.55,
        "ssim": 0.342,
        "lpips": 0.512,
        "fps": 229,
        "size": 5.44
      },
      {
        "psnr": 23.41,
        "ssim": 0.864,
        "lpips": 0.119,
        "fps": 178,
        "size": 181.72
      },
      {
        "psnr": 23.68,
        "ssim": 0.865,
        "lpips": 0.123,
        "fps": 185,
        "size": 6.09
      }
    ],
    [
      {
        "psnr": 17.3,
        "ssim": 0.626,
        "lpips": 0.263,
        "fps": 177,
        "size": 105.48
      },
      {
        "psnr": 15.57,
        "ssim": 0.506,
        "lpips": 0.413,
        "fps": 158,
        "size": 17.28
      },
      {
        "psnr": 24.0,
        "ssim": 0.871,
        "lpips": 0.118,
        "fps": 131,
        "size": 510.37
      },
      {
        "psnr": 24.25,
        "ssim": 0.873,
        "lpips": 0.121,
        "fps": 160,
        "size": 15.18
      }
    ],
    [
      {
        "psnr": 20.69,
        "ssim": 0.791,
        "lpips": 0.174,
        "fps": 160,
        "size": 210.95
      },
      {
        "psnr": 21.34,
        "ssim": 0.768,
        "lpips": 0.225,
        "fps": 144,
        "size": 33.2
      },
      {
        "psnr": 23.91,
        "ssim": 0.86,
        "lpips": 0.133,
        "fps": 88,
        "size": 1087.07
      },
      {
        "psnr": 24.11,
        "ssim": 0.86,
        "lpips": 0.132,
        "fps": 151,
        "size": 26.63
      }
    ],
    [
      {
        "psnr": 23.22,
        "ssim": 0.827,
        "lpips": 0.182,
        "fps": 134,
        "size": 421.91
      },
      {
        "psnr": 22.8,
        "ssim": 0.783,
        "lpips": 0.254,
        "fps": 142,
        "size": 37.82
      },
      {
        "psnr": 23.27,
        "ssim": 0.834,
        "lpips": 0.185,
        "fps": 64,
        "size": 2115.54
      },
      {
        "psnr": 23.47,
        "ssim": 0.836,
        "lpips": 0.184,
        "fps": 135,
        "size": 42.45
      }
    ]
  ]
};
