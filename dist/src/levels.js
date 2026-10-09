import {extraContracts} from "./contracts.js";
const data=[
 {
  "id": 1,
  "name": "첫 번째 야간 배송",
  "chapter": 1,
  "grade": "HARD",
  "width": 11,
  "height": 9,
  "blocked": [
   {
    "x": 0,
    "y": 0
   },
   {
    "x": 1,
    "y": 0
   },
   {
    "x": 2,
    "y": 0
   },
   {
    "x": 3,
    "y": 0
   },
   {
    "x": 4,
    "y": 0
   },
   {
    "x": 5,
    "y": 0
   },
   {
    "x": 6,
    "y": 0
   },
   {
    "x": 7,
    "y": 0
   },
   {
    "x": 8,
    "y": 0
   },
   {
    "x": 9,
    "y": 0
   },
   {
    "x": 10,
    "y": 0
   },
   {
    "x": 6,
    "y": 1
   },
   {
    "x": 3,
    "y": 2
   },
   {
    "x": 5,
    "y": 2
   },
   {
    "x": 6,
    "y": 2
   },
   {
    "x": 3,
    "y": 3
   },
   {
    "x": 4,
    "y": 3
   },
   {
    "x": 6,
    "y": 3
   },
   {
    "x": 2,
    "y": 5
   },
   {
    "x": 3,
    "y": 5
   },
   {
    "x": 6,
    "y": 5
   },
   {
    "x": 9,
    "y": 5
   },
   {
    "x": 1,
    "y": 6
   },
   {
    "x": 3,
    "y": 6
   },
   {
    "x": 6,
    "y": 6
   },
   {
    "x": 8,
    "y": 6
   },
   {
    "x": 0,
    "y": 8
   },
   {
    "x": 1,
    "y": 8
   },
   {
    "x": 2,
    "y": 8
   },
   {
    "x": 3,
    "y": 8
   },
   {
    "x": 4,
    "y": 8
   },
   {
    "x": 5,
    "y": 8
   },
   {
    "x": 6,
    "y": 8
   },
   {
    "x": 7,
    "y": 8
   },
   {
    "x": 8,
    "y": 8
   },
   {
    "x": 9,
    "y": 8
   },
   {
    "x": 10,
    "y": 8
   }
  ],
  "sources": [
   {
    "id": "I1",
    "x": 0,
    "y": 1,
    "dir": 0
   }
  ],
  "exits": [
   {
    "id": "R",
    "color": "R",
    "x": 10,
    "y": 4
   },
   {
    "id": "B",
    "color": "B",
    "x": 10,
    "y": 7
   }
  ],
  "orders": [
   {
    "id": "P01",
    "source": "I1",
    "color": "R",
    "release": 1,
    "urgent": false,
    "due": 21
   },
   {
    "id": "P02",
    "source": "I1",
    "color": "B",
    "release": 6,
    "urgent": false,
    "due": 29
   },
   {
    "id": "P03",
    "source": "I1",
    "color": "R",
    "release": 11,
    "urgent": false,
    "due": 31
   },
   {
    "id": "P04",
    "source": "I1",
    "color": "R",
    "release": 16,
    "urgent": false,
    "due": 36
   },
   {
    "id": "P05",
    "source": "I1",
    "color": "B",
    "release": 21,
    "urgent": false,
    "due": 44
   },
   {
    "id": "P06",
    "source": "I1",
    "color": "R",
    "release": 26,
    "urgent": false,
    "due": 46
   },
   {
    "id": "P07",
    "source": "I1",
    "color": "R",
    "release": 31,
    "urgent": false,
    "due": 51
   },
   {
    "id": "P08",
    "source": "I1",
    "color": "B",
    "release": 36,
    "urgent": false,
    "due": 59
   },
   {
    "id": "P09",
    "source": "I1",
    "color": "R",
    "release": 41,
    "urgent": false,
    "due": 61
   },
   {
    "id": "P10",
    "source": "I1",
    "color": "R",
    "release": 46,
    "urgent": false,
    "due": 66
   },
   {
    "id": "P11",
    "source": "I1",
    "color": "B",
    "release": 51,
    "urgent": false,
    "due": 74
   },
   {
    "id": "P12",
    "source": "I1",
    "color": "R",
    "release": 56,
    "urgent": false,
    "due": 76
   }
  ],
  "maintenance": [],
  "budget": 30,
  "maxTicks": 180,
  "starter": [
   {
    "x": 1,
    "y": 1,
    "type": "belt",
    "dir": 0
   },
   {
    "x": 2,
    "y": 2,
    "type": "belt",
    "dir": 1
   },
   {
    "x": 4,
    "y": 4,
    "type": "belt",
    "dir": 0
   },
   {
    "x": 8,
    "y": 4,
    "type": "belt",
    "dir": 0
   },
   {
    "x": 7,
    "y": 7,
    "type": "belt",
    "dir": 0
   }
  ],
  "brief": "두 종류의 화물을 분류하고 마감 전에 출고하세요.",
  "hint": "직선 벨트만으로는 합류가 막힙니다. 합류 직후 버퍼를 두고, R은 직진 · B는 우회전 · G는 좌회전하는 분류기를 이용해 보세요."
 },
 {
  "id": 2,
  "name": "두 투입구의 충돌",
  "chapter": 1,
  "grade": "HARD",
  "width": 9,
  "height": 11,
  "blocked": [
   {
    "x": 8,
    "y": 0
   },
   {
    "x": 8,
    "y": 1
   },
   {
    "x": 8,
    "y": 2
   },
   {
    "x": 8,
    "y": 3
   },
   {
    "x": 8,
    "y": 4
   },
   {
    "x": 8,
    "y": 5
   },
   {
    "x": 8,
    "y": 6
   },
   {
    "x": 8,
    "y": 7
   },
   {
    "x": 8,
    "y": 8
   },
   {
    "x": 8,
    "y": 9
   },
   {
    "x": 8,
    "y": 10
   },
   {
    "x": 7,
    "y": 5
   },
   {
    "x": 6,
    "y": 4
   },
   {
    "x": 6,
    "y": 7
   },
   {
    "x": 5,
    "y": 4
   },
   {
    "x": 5,
    "y": 7
   },
   {
    "x": 4,
    "y": 2
   },
   {
    "x": 3,
    "y": 1
   },
   {
    "x": 3,
    "y": 4
   },
   {
    "x": 3,
    "y": 7
   },
   {
    "x": 2,
    "y": 7
   },
   {
    "x": 1,
    "y": 4
   },
   {
    "x": 1,
    "y": 6
   },
   {
    "x": 1,
    "y": 7
   },
   {
    "x": 0,
    "y": 0
   },
   {
    "x": 0,
    "y": 1
   },
   {
    "x": 0,
    "y": 2
   },
   {
    "x": 0,
    "y": 3
   },
   {
    "x": 0,
    "y": 4
   },
   {
    "x": 0,
    "y": 5
   },
   {
    "x": 0,
    "y": 6
   },
   {
    "x": 0,
    "y": 7
   },
   {
    "x": 0,
    "y": 8
   },
   {
    "x": 0,
    "y": 9
   },
   {
    "x": 0,
    "y": 10
   }
  ],
  "sources": [
   {
    "id": "I1",
    "x": 6,
    "y": 0,
    "dir": 1
   },
   {
    "id": "I2",
    "x": 1,
    "y": 0,
    "dir": 1
   }
  ],
  "exits": [
   {
    "id": "R",
    "color": "R",
    "x": 4,
    "y": 10
   },
   {
    "id": "B",
    "color": "B",
    "x": 2,
    "y": 10
   }
  ],
  "orders": [
   {
    "id": "P01",
    "source": "I1",
    "color": "B",
    "release": 1,
    "urgent": false,
    "due": 22
   },
   {
    "id": "P02",
    "source": "I2",
    "color": "R",
    "release": 3,
    "urgent": false,
    "due": 23
   },
   {
    "id": "P03",
    "source": "I1",
    "color": "B",
    "release": 6,
    "urgent": false,
    "due": 27
   },
   {
    "id": "P04",
    "source": "I2",
    "color": "B",
    "release": 8,
    "urgent": false,
    "due": 30
   },
   {
    "id": "P05",
    "source": "I1",
    "color": "R",
    "release": 11,
    "urgent": false,
    "due": 30
   },
   {
    "id": "P06",
    "source": "I2",
    "color": "B",
    "release": 13,
    "urgent": false,
    "due": 35
   },
   {
    "id": "P07",
    "source": "I1",
    "color": "B",
    "release": 16,
    "urgent": false,
    "due": 37
   },
   {
    "id": "P08",
    "source": "I2",
    "color": "R",
    "release": 18,
    "urgent": false,
    "due": 38
   },
   {
    "id": "P09",
    "source": "I1",
    "color": "B",
    "release": 21,
    "urgent": false,
    "due": 42
   },
   {
    "id": "P10",
    "source": "I2",
    "color": "B",
    "release": 23,
    "urgent": false,
    "due": 45
   },
   {
    "id": "P11",
    "source": "I1",
    "color": "R",
    "release": 26,
    "urgent": false,
    "due": 45
   },
   {
    "id": "P12",
    "source": "I2",
    "color": "B",
    "release": 28,
    "urgent": false,
    "due": 50
   },
   {
    "id": "P13",
    "source": "I1",
    "color": "B",
    "release": 31,
    "urgent": false,
    "due": 52
   },
   {
    "id": "P14",
    "source": "I2",
    "color": "R",
    "release": 33,
    "urgent": false,
    "due": 53
   },
   {
    "id": "P15",
    "source": "I1",
    "color": "B",
    "release": 36,
    "urgent": false,
    "due": 57
   },
   {
    "id": "P16",
    "source": "I2",
    "color": "B",
    "release": 38,
    "urgent": false,
    "due": 60
   },
   {
    "id": "P17",
    "source": "I1",
    "color": "R",
    "release": 41,
    "urgent": false,
    "due": 60
   },
   {
    "id": "P18",
    "source": "I2",
    "color": "B",
    "release": 43,
    "urgent": false,
    "due": 65
   },
   {
    "id": "P19",
    "source": "I1",
    "color": "B",
    "release": 46,
    "urgent": false,
    "due": 67
   }
  ],
  "maintenance": [],
  "budget": 32,
  "maxTicks": 180,
  "starter": [
   {
    "x": 6,
    "y": 1,
    "type": "belt",
    "dir": 1
   },
   {
    "x": 4,
    "y": 3,
    "type": "buffer",
    "dir": 1
   },
   {
    "x": 4,
    "y": 7,
    "type": "belt",
    "dir": 1
   },
   {
    "x": 2,
    "y": 9,
    "type": "belt",
    "dir": 1
   }
  ],
  "brief": "두 종류의 화물을 분류하고 마감 전에 출고하세요.",
  "hint": "직선 벨트만으로는 합류가 막힙니다. 합류 직후 버퍼를 두고, R은 직진 · B는 우회전 · G는 좌회전하는 분류기를 이용해 보세요."
 },
 {
  "id": 3,
  "name": "세 갈래 주문",
  "chapter": 1,
  "grade": "HARD",
  "width": 11,
  "height": 9,
  "blocked": [
   {
    "x": 10,
    "y": 8
   },
   {
    "x": 9,
    "y": 8
   },
   {
    "x": 8,
    "y": 8
   },
   {
    "x": 7,
    "y": 8
   },
   {
    "x": 6,
    "y": 8
   },
   {
    "x": 5,
    "y": 8
   },
   {
    "x": 4,
    "y": 8
   },
   {
    "x": 3,
    "y": 8
   },
   {
    "x": 2,
    "y": 8
   },
   {
    "x": 1,
    "y": 8
   },
   {
    "x": 0,
    "y": 8
   },
   {
    "x": 7,
    "y": 7
   },
   {
    "x": 6,
    "y": 7
   },
   {
    "x": 5,
    "y": 7
   },
   {
    "x": 7,
    "y": 6
   },
   {
    "x": 7,
    "y": 5
   },
   {
    "x": 5,
    "y": 5
   },
   {
    "x": 1,
    "y": 5
   },
   {
    "x": 9,
    "y": 4
   },
   {
    "x": 7,
    "y": 3
   },
   {
    "x": 5,
    "y": 3
   },
   {
    "x": 3,
    "y": 3
   },
   {
    "x": 7,
    "y": 2
   },
   {
    "x": 5,
    "y": 2
   },
   {
    "x": 5,
    "y": 1
   },
   {
    "x": 10,
    "y": 0
   },
   {
    "x": 9,
    "y": 0
   },
   {
    "x": 8,
    "y": 0
   },
   {
    "x": 7,
    "y": 0
   },
   {
    "x": 6,
    "y": 0
   },
   {
    "x": 5,
    "y": 0
   },
   {
    "x": 4,
    "y": 0
   },
   {
    "x": 3,
    "y": 0
   },
   {
    "x": 2,
    "y": 0
   },
   {
    "x": 1,
    "y": 0
   },
   {
    "x": 0,
    "y": 0
   }
  ],
  "sources": [
   {
    "id": "I1",
    "x": 10,
    "y": 7,
    "dir": 2
   },
   {
    "id": "I2",
    "x": 10,
    "y": 2,
    "dir": 2
   }
  ],
  "exits": [
   {
    "id": "R",
    "color": "R",
    "x": 0,
    "y": 4
   },
   {
    "id": "B",
    "color": "B",
    "x": 0,
    "y": 1
   },
   {
    "id": "G",
    "color": "G",
    "x": 0,
    "y": 6
   }
  ],
  "orders": [
   {
    "id": "P01",
    "source": "I1",
    "color": "G",
    "release": 1,
    "urgent": false,
    "due": 23
   },
   {
    "id": "P02",
    "source": "I2",
    "color": "R",
    "release": 3,
    "urgent": false,
    "due": 23
   },
   {
    "id": "P03",
    "source": "I1",
    "color": "B",
    "release": 6,
    "urgent": false,
    "due": 29
   },
   {
    "id": "P04",
    "source": "I2",
    "color": "R",
    "release": 8,
    "urgent": false,
    "due": 28
   },
   {
    "id": "P05",
    "source": "I1",
    "color": "B",
    "release": 11,
    "urgent": false,
    "due": 34
   },
   {
    "id": "P06",
    "source": "I2",
    "color": "G",
    "release": 13,
    "urgent": false,
    "due": 35
   },
   {
    "id": "P07",
    "source": "I1",
    "color": "B",
    "release": 16,
    "urgent": false,
    "due": 39
   },
   {
    "id": "P08",
    "source": "I2",
    "color": "G",
    "release": 18,
    "urgent": false,
    "due": 40
   },
   {
    "id": "P09",
    "source": "I1",
    "color": "R",
    "release": 21,
    "urgent": false,
    "due": 41
   },
   {
    "id": "P10",
    "source": "I2",
    "color": "G",
    "release": 23,
    "urgent": false,
    "due": 45
   },
   {
    "id": "P11",
    "source": "I1",
    "color": "R",
    "release": 26,
    "urgent": false,
    "due": 46
   },
   {
    "id": "P12",
    "source": "I2",
    "color": "B",
    "release": 28,
    "urgent": false,
    "due": 51
   },
   {
    "id": "P13",
    "source": "I1",
    "color": "R",
    "release": 31,
    "urgent": false,
    "due": 51
   },
   {
    "id": "P14",
    "source": "I2",
    "color": "B",
    "release": 33,
    "urgent": false,
    "due": 56
   },
   {
    "id": "P15",
    "source": "I1",
    "color": "G",
    "release": 36,
    "urgent": false,
    "due": 58
   },
   {
    "id": "P16",
    "source": "I2",
    "color": "B",
    "release": 38,
    "urgent": false,
    "due": 61
   },
   {
    "id": "P17",
    "source": "I1",
    "color": "G",
    "release": 41,
    "urgent": false,
    "due": 63
   },
   {
    "id": "P18",
    "source": "I2",
    "color": "R",
    "release": 43,
    "urgent": false,
    "due": 63
   },
   {
    "id": "P19",
    "source": "I1",
    "color": "G",
    "release": 46,
    "urgent": false,
    "due": 68
   },
   {
    "id": "P20",
    "source": "I2",
    "color": "R",
    "release": 48,
    "urgent": false,
    "due": 68
   }
  ],
  "maintenance": [],
  "budget": 41,
  "maxTicks": 180,
  "starter": [
   {
    "x": 9,
    "y": 7,
    "type": "belt",
    "dir": 2
   },
   {
    "x": 8,
    "y": 6,
    "type": "belt",
    "dir": 3
   },
   {
    "x": 8,
    "y": 2,
    "type": "belt",
    "dir": 1
   },
   {
    "x": 6,
    "y": 4,
    "type": "buffer",
    "dir": 2
   },
   {
    "x": 2,
    "y": 4,
    "type": "belt",
    "dir": 2
   }
  ],
  "brief": "두 종류의 화물을 분류하고 마감 전에 출고하세요.",
  "hint": "직선 벨트만으로는 합류가 막힙니다. 합류 직후 버퍼를 두고, R은 직진 · B는 우회전 · G는 좌회전하는 분류기를 이용해 보세요."
 },
 {
  "id": 4,
  "name": "좁은 목의 공장",
  "chapter": 2,
  "grade": "EXPERT",
  "width": 9,
  "height": 11,
  "blocked": [
   {
    "x": 0,
    "y": 10
   },
   {
    "x": 0,
    "y": 9
   },
   {
    "x": 0,
    "y": 8
   },
   {
    "x": 0,
    "y": 7
   },
   {
    "x": 0,
    "y": 6
   },
   {
    "x": 0,
    "y": 5
   },
   {
    "x": 0,
    "y": 4
   },
   {
    "x": 0,
    "y": 3
   },
   {
    "x": 0,
    "y": 2
   },
   {
    "x": 0,
    "y": 1
   },
   {
    "x": 0,
    "y": 0
   },
   {
    "x": 1,
    "y": 7
   },
   {
    "x": 1,
    "y": 5
   },
   {
    "x": 1,
    "y": 4
   },
   {
    "x": 3,
    "y": 9
   },
   {
    "x": 3,
    "y": 5
   },
   {
    "x": 3,
    "y": 4
   },
   {
    "x": 3,
    "y": 2
   },
   {
    "x": 5,
    "y": 5
   },
   {
    "x": 5,
    "y": 4
   },
   {
    "x": 6,
    "y": 5
   },
   {
    "x": 7,
    "y": 6
   },
   {
    "x": 7,
    "y": 5
   },
   {
    "x": 7,
    "y": 4
   },
   {
    "x": 8,
    "y": 10
   },
   {
    "x": 8,
    "y": 9
   },
   {
    "x": 8,
    "y": 8
   },
   {
    "x": 8,
    "y": 7
   },
   {
    "x": 8,
    "y": 6
   },
   {
    "x": 8,
    "y": 5
   },
   {
    "x": 8,
    "y": 4
   },
   {
    "x": 8,
    "y": 3
   },
   {
    "x": 8,
    "y": 2
   },
   {
    "x": 8,
    "y": 1
   },
   {
    "x": 8,
    "y": 0
   }
  ],
  "sources": [
   {
    "id": "I1",
    "x": 2,
    "y": 10,
    "dir": 3
   },
   {
    "id": "I2",
    "x": 6,
    "y": 10,
    "dir": 3
   }
  ],
  "exits": [
   {
    "id": "R",
    "color": "R",
    "x": 4,
    "y": 0
   },
   {
    "id": "B",
    "color": "B",
    "x": 6,
    "y": 0
   },
   {
    "id": "G",
    "color": "G",
    "x": 2,
    "y": 0
   }
  ],
  "orders": [
   {
    "id": "P01",
    "source": "I1",
    "color": "R",
    "release": 1,
    "urgent": false,
    "due": 17
   },
   {
    "id": "P02",
    "source": "I2",
    "color": "B",
    "release": 3,
    "urgent": false,
    "due": 21
   },
   {
    "id": "P03",
    "source": "I1",
    "color": "G",
    "release": 6,
    "urgent": false,
    "due": 24
   },
   {
    "id": "P04",
    "source": "I2",
    "color": "B",
    "release": 8,
    "urgent": false,
    "due": 26
   },
   {
    "id": "P05",
    "source": "I1",
    "color": "G",
    "release": 11,
    "urgent": false,
    "due": 29
   },
   {
    "id": "P06",
    "source": "I2",
    "color": "R",
    "release": 13,
    "urgent": false,
    "due": 29
   },
   {
    "id": "P07",
    "source": "I1",
    "color": "G",
    "release": 16,
    "urgent": false,
    "due": 34
   },
   {
    "id": "P08",
    "source": "I2",
    "color": "R",
    "release": 18,
    "urgent": false,
    "due": 34
   },
   {
    "id": "P09",
    "source": "I1",
    "color": "B",
    "release": 21,
    "urgent": false,
    "due": 39
   },
   {
    "id": "P10",
    "source": "I2",
    "color": "R",
    "release": 23,
    "urgent": false,
    "due": 39
   },
   {
    "id": "P11",
    "source": "I1",
    "color": "B",
    "release": 26,
    "urgent": false,
    "due": 44
   },
   {
    "id": "P12",
    "source": "I2",
    "color": "G",
    "release": 28,
    "urgent": false,
    "due": 46
   },
   {
    "id": "P13",
    "source": "I1",
    "color": "B",
    "release": 31,
    "urgent": false,
    "due": 49
   },
   {
    "id": "P14",
    "source": "I2",
    "color": "G",
    "release": 33,
    "urgent": false,
    "due": 51
   },
   {
    "id": "P15",
    "source": "I1",
    "color": "R",
    "release": 36,
    "urgent": false,
    "due": 52
   },
   {
    "id": "P16",
    "source": "I2",
    "color": "G",
    "release": 38,
    "urgent": false,
    "due": 56
   },
   {
    "id": "P17",
    "source": "I1",
    "color": "R",
    "release": 41,
    "urgent": false,
    "due": 57
   },
   {
    "id": "P18",
    "source": "I2",
    "color": "B",
    "release": 43,
    "urgent": false,
    "due": 61
   },
   {
    "id": "P19",
    "source": "I1",
    "color": "R",
    "release": 46,
    "urgent": false,
    "due": 62
   },
   {
    "id": "P20",
    "source": "I2",
    "color": "B",
    "release": 48,
    "urgent": false,
    "due": 66
   },
   {
    "id": "P21",
    "source": "I1",
    "color": "G",
    "release": 51,
    "urgent": false,
    "due": 69
   }
  ],
  "maintenance": [],
  "budget": 34,
  "maxTicks": 180,
  "starter": [],
  "brief": "합류점의 대기열과 정비 시간을 함께 계산하세요.",
  "hint": "직선 벨트만으로는 합류가 막힙니다. 합류 직후 버퍼를 두고, R은 직진 · B는 우회전 · G는 좌회전하는 분류기를 이용해 보세요."
 },
 {
  "id": 5,
  "name": "정지된 허브",
  "chapter": 2,
  "grade": "EXPERT",
  "width": 11,
  "height": 9,
  "blocked": [
   {
    "x": 0,
    "y": 0
   },
   {
    "x": 1,
    "y": 0
   },
   {
    "x": 2,
    "y": 0
   },
   {
    "x": 3,
    "y": 0
   },
   {
    "x": 4,
    "y": 0
   },
   {
    "x": 5,
    "y": 0
   },
   {
    "x": 6,
    "y": 0
   },
   {
    "x": 7,
    "y": 0
   },
   {
    "x": 8,
    "y": 0
   },
   {
    "x": 9,
    "y": 0
   },
   {
    "x": 10,
    "y": 0
   },
   {
    "x": 1,
    "y": 2
   },
   {
    "x": 3,
    "y": 2
   },
   {
    "x": 7,
    "y": 2
   },
   {
    "x": 3,
    "y": 3
   },
   {
    "x": 7,
    "y": 3
   },
   {
    "x": 3,
    "y": 5
   },
   {
    "x": 5,
    "y": 5
   },
   {
    "x": 7,
    "y": 5
   },
   {
    "x": 3,
    "y": 6
   },
   {
    "x": 4,
    "y": 6
   },
   {
    "x": 7,
    "y": 6
   },
   {
    "x": 3,
    "y": 7
   },
   {
    "x": 0,
    "y": 8
   },
   {
    "x": 1,
    "y": 8
   },
   {
    "x": 2,
    "y": 8
   },
   {
    "x": 3,
    "y": 8
   },
   {
    "x": 4,
    "y": 8
   },
   {
    "x": 5,
    "y": 8
   },
   {
    "x": 6,
    "y": 8
   },
   {
    "x": 7,
    "y": 8
   },
   {
    "x": 8,
    "y": 8
   },
   {
    "x": 9,
    "y": 8
   },
   {
    "x": 10,
    "y": 8
   }
  ],
  "sources": [
   {
    "id": "I1",
    "x": 0,
    "y": 1,
    "dir": 0
   },
   {
    "id": "I2",
    "x": 0,
    "y": 7,
    "dir": 0
   }
  ],
  "exits": [
   {
    "id": "R",
    "color": "R",
    "x": 10,
    "y": 4
   },
   {
    "id": "B",
    "color": "B",
    "x": 10,
    "y": 7
   },
   {
    "id": "G",
    "color": "G",
    "x": 10,
    "y": 1
   }
  ],
  "orders": [
   {
    "id": "P01",
    "source": "I1",
    "color": "B",
    "release": 1,
    "urgent": false,
    "due": 21
   },
   {
    "id": "P02",
    "source": "I2",
    "color": "G",
    "release": 3,
    "urgent": false,
    "due": 23
   },
   {
    "id": "P03",
    "source": "I1",
    "color": "R",
    "release": 6,
    "urgent": false,
    "due": 23
   },
   {
    "id": "P04",
    "source": "I2",
    "color": "G",
    "release": 8,
    "urgent": false,
    "due": 28
   },
   {
    "id": "P05",
    "source": "I1",
    "color": "R",
    "release": 11,
    "urgent": false,
    "due": 28
   },
   {
    "id": "P06",
    "source": "I2",
    "color": "B",
    "release": 13,
    "urgent": false,
    "due": 33
   },
   {
    "id": "P07",
    "source": "I1",
    "color": "R",
    "release": 16,
    "urgent": false,
    "due": 33
   },
   {
    "id": "P08",
    "source": "I2",
    "color": "B",
    "release": 18,
    "urgent": false,
    "due": 45
   },
   {
    "id": "P09",
    "source": "I1",
    "color": "G",
    "release": 21,
    "urgent": false,
    "due": 47
   },
   {
    "id": "P10",
    "source": "I2",
    "color": "B",
    "release": 23,
    "urgent": false,
    "due": 49
   },
   {
    "id": "P11",
    "source": "I1",
    "color": "G",
    "release": 26,
    "urgent": false,
    "due": 51
   },
   {
    "id": "P12",
    "source": "I2",
    "color": "R",
    "release": 28,
    "urgent": false,
    "due": 50
   },
   {
    "id": "P13",
    "source": "I1",
    "color": "G",
    "release": 31,
    "urgent": false,
    "due": 55
   },
   {
    "id": "P14",
    "source": "I2",
    "color": "R",
    "release": 33,
    "urgent": false,
    "due": 54
   },
   {
    "id": "P15",
    "source": "I1",
    "color": "B",
    "release": 36,
    "urgent": false,
    "due": 59
   },
   {
    "id": "P16",
    "source": "I2",
    "color": "R",
    "release": 38,
    "urgent": false,
    "due": 58
   },
   {
    "id": "P17",
    "source": "I1",
    "color": "B",
    "release": 41,
    "urgent": false,
    "due": 63
   },
   {
    "id": "P18",
    "source": "I2",
    "color": "G",
    "release": 43,
    "urgent": false,
    "due": 65
   },
   {
    "id": "P19",
    "source": "I1",
    "color": "B",
    "release": 46,
    "urgent": false,
    "due": 67
   },
   {
    "id": "P20",
    "source": "I2",
    "color": "G",
    "release": 48,
    "urgent": false,
    "due": 69
   },
   {
    "id": "P21",
    "source": "I1",
    "color": "R",
    "release": 51,
    "urgent": false,
    "due": 68
   },
   {
    "id": "P22",
    "source": "I2",
    "color": "G",
    "release": 53,
    "urgent": false,
    "due": 73
   }
  ],
  "maintenance": [
   {
    "x": 3,
    "y": 4,
    "start": 24,
    "end": 30
   }
  ],
  "budget": 34,
  "maxTicks": 180,
  "starter": [],
  "brief": "합류점의 대기열과 정비 시간을 함께 계산하세요.",
  "hint": "직선 벨트만으로는 합류가 막힙니다. 합류 직후 버퍼를 두고, R은 직진 · B는 우회전 · G는 좌회전하는 분류기를 이용해 보세요."
 },
 {
  "id": 6,
  "name": "급행 우선권",
  "chapter": 2,
  "grade": "EXPERT",
  "width": 9,
  "height": 11,
  "blocked": [
   {
    "x": 8,
    "y": 0
   },
   {
    "x": 8,
    "y": 1
   },
   {
    "x": 8,
    "y": 2
   },
   {
    "x": 8,
    "y": 3
   },
   {
    "x": 8,
    "y": 4
   },
   {
    "x": 8,
    "y": 5
   },
   {
    "x": 8,
    "y": 6
   },
   {
    "x": 8,
    "y": 7
   },
   {
    "x": 8,
    "y": 8
   },
   {
    "x": 8,
    "y": 9
   },
   {
    "x": 8,
    "y": 10
   },
   {
    "x": 7,
    "y": 1
   },
   {
    "x": 6,
    "y": 4
   },
   {
    "x": 6,
    "y": 5
   },
   {
    "x": 6,
    "y": 7
   },
   {
    "x": 5,
    "y": 4
   },
   {
    "x": 5,
    "y": 5
   },
   {
    "x": 3,
    "y": 4
   },
   {
    "x": 3,
    "y": 5
   },
   {
    "x": 1,
    "y": 4
   },
   {
    "x": 1,
    "y": 5
   },
   {
    "x": 1,
    "y": 9
   },
   {
    "x": 0,
    "y": 0
   },
   {
    "x": 0,
    "y": 1
   },
   {
    "x": 0,
    "y": 2
   },
   {
    "x": 0,
    "y": 3
   },
   {
    "x": 0,
    "y": 4
   },
   {
    "x": 0,
    "y": 5
   },
   {
    "x": 0,
    "y": 6
   },
   {
    "x": 0,
    "y": 7
   },
   {
    "x": 0,
    "y": 8
   },
   {
    "x": 0,
    "y": 9
   },
   {
    "x": 0,
    "y": 10
   }
  ],
  "sources": [
   {
    "id": "I1",
    "x": 6,
    "y": 0,
    "dir": 1
   },
   {
    "id": "I2",
    "x": 4,
    "y": 0,
    "dir": 1
   },
   {
    "id": "I3",
    "x": 1,
    "y": 0,
    "dir": 1
   }
  ],
  "exits": [
   {
    "id": "R",
    "color": "R",
    "x": 4,
    "y": 10
   },
   {
    "id": "B",
    "color": "B",
    "x": 2,
    "y": 10
   },
   {
    "id": "G",
    "color": "G",
    "x": 7,
    "y": 10
   }
  ],
  "orders": [
   {
    "id": "P01",
    "source": "I1",
    "color": "G",
    "release": 1,
    "urgent": true,
    "due": 18
   },
   {
    "id": "P02",
    "source": "I2",
    "color": "R",
    "release": 3,
    "urgent": false,
    "due": 19
   },
   {
    "id": "P03",
    "source": "I3",
    "color": "B",
    "release": 5,
    "urgent": false,
    "due": 24
   },
   {
    "id": "P04",
    "source": "I1",
    "color": "R",
    "release": 8,
    "urgent": false,
    "due": 24
   },
   {
    "id": "P05",
    "source": "I2",
    "color": "B",
    "release": 10,
    "urgent": true,
    "due": 26
   },
   {
    "id": "P06",
    "source": "I3",
    "color": "G",
    "release": 12,
    "urgent": false,
    "due": 32
   },
   {
    "id": "P07",
    "source": "I1",
    "color": "B",
    "release": 15,
    "urgent": false,
    "due": 33
   },
   {
    "id": "P08",
    "source": "I2",
    "color": "G",
    "release": 17,
    "urgent": false,
    "due": 36
   },
   {
    "id": "P09",
    "source": "I3",
    "color": "R",
    "release": 19,
    "urgent": true,
    "due": 40
   },
   {
    "id": "P10",
    "source": "I1",
    "color": "G",
    "release": 22,
    "urgent": false,
    "due": 47
   },
   {
    "id": "P11",
    "source": "I2",
    "color": "R",
    "release": 24,
    "urgent": false,
    "due": 46
   },
   {
    "id": "P12",
    "source": "I3",
    "color": "B",
    "release": 26,
    "urgent": false,
    "due": 50
   },
   {
    "id": "P13",
    "source": "I1",
    "color": "R",
    "release": 29,
    "urgent": true,
    "due": 48
   },
   {
    "id": "P14",
    "source": "I2",
    "color": "B",
    "release": 31,
    "urgent": false,
    "due": 54
   },
   {
    "id": "P15",
    "source": "I3",
    "color": "G",
    "release": 33,
    "urgent": false,
    "due": 57
   },
   {
    "id": "P16",
    "source": "I1",
    "color": "B",
    "release": 36,
    "urgent": false,
    "due": 60
   },
   {
    "id": "P17",
    "source": "I2",
    "color": "G",
    "release": 38,
    "urgent": true,
    "due": 57
   },
   {
    "id": "P18",
    "source": "I3",
    "color": "R",
    "release": 40,
    "urgent": false,
    "due": 60
   },
   {
    "id": "P19",
    "source": "I1",
    "color": "G",
    "release": 43,
    "urgent": false,
    "due": 65
   },
   {
    "id": "P20",
    "source": "I2",
    "color": "R",
    "release": 45,
    "urgent": false,
    "due": 64
   },
   {
    "id": "P21",
    "source": "I3",
    "color": "B",
    "release": 47,
    "urgent": true,
    "due": 66
   },
   {
    "id": "P22",
    "source": "I1",
    "color": "R",
    "release": 50,
    "urgent": false,
    "due": 68
   },
   {
    "id": "P23",
    "source": "I2",
    "color": "B",
    "release": 52,
    "urgent": false,
    "due": 72
   }
  ],
  "maintenance": [
   {
    "x": 4,
    "y": 4,
    "start": 25,
    "end": 31
   }
  ],
  "budget": 39,
  "maxTicks": 180,
  "starter": [],
  "brief": "합류점의 대기열과 정비 시간을 함께 계산하세요.",
  "hint": "직선 벨트만으로는 합류가 막힙니다. 합류 직후 버퍼를 두고, R은 직진 · B는 우회전 · G는 좌회전하는 분류기를 이용해 보세요."
 },
 {
  "id": 7,
  "name": "세 줄의 포화",
  "chapter": 3,
  "grade": "MASTER",
  "width": 11,
  "height": 9,
  "blocked": [
   {
    "x": 10,
    "y": 8
   },
   {
    "x": 9,
    "y": 8
   },
   {
    "x": 8,
    "y": 8
   },
   {
    "x": 7,
    "y": 8
   },
   {
    "x": 6,
    "y": 8
   },
   {
    "x": 5,
    "y": 8
   },
   {
    "x": 4,
    "y": 8
   },
   {
    "x": 3,
    "y": 8
   },
   {
    "x": 2,
    "y": 8
   },
   {
    "x": 1,
    "y": 8
   },
   {
    "x": 0,
    "y": 8
   },
   {
    "x": 7,
    "y": 7
   },
   {
    "x": 4,
    "y": 7
   },
   {
    "x": 3,
    "y": 7
   },
   {
    "x": 4,
    "y": 6
   },
   {
    "x": 7,
    "y": 5
   },
   {
    "x": 5,
    "y": 5
   },
   {
    "x": 4,
    "y": 5
   },
   {
    "x": 7,
    "y": 3
   },
   {
    "x": 4,
    "y": 3
   },
   {
    "x": 7,
    "y": 2
   },
   {
    "x": 4,
    "y": 2
   },
   {
    "x": 1,
    "y": 2
   },
   {
    "x": 9,
    "y": 1
   },
   {
    "x": 10,
    "y": 0
   },
   {
    "x": 9,
    "y": 0
   },
   {
    "x": 8,
    "y": 0
   },
   {
    "x": 7,
    "y": 0
   },
   {
    "x": 6,
    "y": 0
   },
   {
    "x": 5,
    "y": 0
   },
   {
    "x": 4,
    "y": 0
   },
   {
    "x": 3,
    "y": 0
   },
   {
    "x": 2,
    "y": 0
   },
   {
    "x": 1,
    "y": 0
   },
   {
    "x": 0,
    "y": 0
   }
  ],
  "sources": [
   {
    "id": "I1",
    "x": 10,
    "y": 7,
    "dir": 2
   },
   {
    "id": "I2",
    "x": 10,
    "y": 4,
    "dir": 2
   },
   {
    "id": "I3",
    "x": 10,
    "y": 2,
    "dir": 2
   }
  ],
  "exits": [
   {
    "id": "R",
    "color": "R",
    "x": 0,
    "y": 4
   },
   {
    "id": "B",
    "color": "B",
    "x": 0,
    "y": 1
   },
   {
    "id": "G",
    "color": "G",
    "x": 0,
    "y": 6
   }
  ],
  "orders": [
   {
    "id": "P01",
    "source": "I1",
    "color": "R",
    "release": 1,
    "urgent": true,
    "due": 17
   },
   {
    "id": "P02",
    "source": "I2",
    "color": "B",
    "release": 3,
    "urgent": false,
    "due": 20
   },
   {
    "id": "P03",
    "source": "I3",
    "color": "G",
    "release": 5,
    "urgent": false,
    "due": 23
   },
   {
    "id": "P04",
    "source": "I1",
    "color": "B",
    "release": 8,
    "urgent": false,
    "due": 29
   },
   {
    "id": "P05",
    "source": "I2",
    "color": "G",
    "release": 10,
    "urgent": true,
    "due": 24
   },
   {
    "id": "P06",
    "source": "I3",
    "color": "R",
    "release": 12,
    "urgent": false,
    "due": 28
   },
   {
    "id": "P07",
    "source": "I1",
    "color": "G",
    "release": 15,
    "urgent": false,
    "due": 35
   },
   {
    "id": "P08",
    "source": "I2",
    "color": "R",
    "release": 17,
    "urgent": false,
    "due": 31
   },
   {
    "id": "P09",
    "source": "I3",
    "color": "B",
    "release": 19,
    "urgent": true,
    "due": 36
   },
   {
    "id": "P10",
    "source": "I1",
    "color": "R",
    "release": 22,
    "urgent": false,
    "due": 46
   },
   {
    "id": "P11",
    "source": "I2",
    "color": "B",
    "release": 24,
    "urgent": false,
    "due": 47
   },
   {
    "id": "P12",
    "source": "I3",
    "color": "G",
    "release": 26,
    "urgent": false,
    "due": 50
   },
   {
    "id": "P13",
    "source": "I1",
    "color": "B",
    "release": 29,
    "urgent": true,
    "due": 51
   },
   {
    "id": "P14",
    "source": "I2",
    "color": "G",
    "release": 31,
    "urgent": false,
    "due": 54
   },
   {
    "id": "P15",
    "source": "I3",
    "color": "R",
    "release": 33,
    "urgent": false,
    "due": 54
   },
   {
    "id": "P16",
    "source": "I1",
    "color": "G",
    "release": 36,
    "urgent": false,
    "due": 60
   },
   {
    "id": "P17",
    "source": "I2",
    "color": "R",
    "release": 38,
    "urgent": true,
    "due": 54
   },
   {
    "id": "P18",
    "source": "I3",
    "color": "B",
    "release": 40,
    "urgent": false,
    "due": 63
   },
   {
    "id": "P19",
    "source": "I1",
    "color": "R",
    "release": 43,
    "urgent": false,
    "due": 64
   },
   {
    "id": "P20",
    "source": "I2",
    "color": "B",
    "release": 45,
    "urgent": false,
    "due": 65
   },
   {
    "id": "P21",
    "source": "I3",
    "color": "G",
    "release": 47,
    "urgent": true,
    "due": 66
   },
   {
    "id": "P22",
    "source": "I1",
    "color": "B",
    "release": 50,
    "urgent": false,
    "due": 73
   },
   {
    "id": "P23",
    "source": "I2",
    "color": "G",
    "release": 52,
    "urgent": false,
    "due": 70
   },
   {
    "id": "P24",
    "source": "I3",
    "color": "R",
    "release": 54,
    "urgent": false,
    "due": 72
   }
  ],
  "maintenance": [
   {
    "x": 7,
    "y": 4,
    "start": 26,
    "end": 32
   }
  ],
  "budget": 35,
  "maxTicks": 180,
  "starter": [],
  "brief": "세 투입구의 급행 주문, 제한 예산과 정비 구간을 동시에 해결하세요.",
  "hint": "직선 벨트만으로는 합류가 막힙니다. 합류 직후 버퍼를 두고, R은 직진 · B는 우회전 · G는 좌회전하는 분류기를 이용해 보세요."
 },
 {
  "id": 8,
  "name": "남쪽 출고 라인",
  "chapter": 3,
  "grade": "MASTER",
  "width": 9,
  "height": 11,
  "blocked": [
   {
    "x": 0,
    "y": 10
   },
   {
    "x": 0,
    "y": 9
   },
   {
    "x": 0,
    "y": 8
   },
   {
    "x": 0,
    "y": 7
   },
   {
    "x": 0,
    "y": 6
   },
   {
    "x": 0,
    "y": 5
   },
   {
    "x": 0,
    "y": 4
   },
   {
    "x": 0,
    "y": 3
   },
   {
    "x": 0,
    "y": 2
   },
   {
    "x": 0,
    "y": 1
   },
   {
    "x": 0,
    "y": 0
   },
   {
    "x": 1,
    "y": 5
   },
   {
    "x": 1,
    "y": 4
   },
   {
    "x": 1,
    "y": 3
   },
   {
    "x": 2,
    "y": 5
   },
   {
    "x": 3,
    "y": 5
   },
   {
    "x": 3,
    "y": 3
   },
   {
    "x": 5,
    "y": 8
   },
   {
    "x": 5,
    "y": 5
   },
   {
    "x": 5,
    "y": 3
   },
   {
    "x": 5,
    "y": 1
   },
   {
    "x": 7,
    "y": 5
   },
   {
    "x": 7,
    "y": 3
   },
   {
    "x": 8,
    "y": 10
   },
   {
    "x": 8,
    "y": 9
   },
   {
    "x": 8,
    "y": 8
   },
   {
    "x": 8,
    "y": 7
   },
   {
    "x": 8,
    "y": 6
   },
   {
    "x": 8,
    "y": 5
   },
   {
    "x": 8,
    "y": 4
   },
   {
    "x": 8,
    "y": 3
   },
   {
    "x": 8,
    "y": 2
   },
   {
    "x": 8,
    "y": 1
   },
   {
    "x": 8,
    "y": 0
   }
  ],
  "sources": [
   {
    "id": "I1",
    "x": 2,
    "y": 10,
    "dir": 3
   },
   {
    "id": "I2",
    "x": 4,
    "y": 10,
    "dir": 3
   },
   {
    "id": "I3",
    "x": 6,
    "y": 10,
    "dir": 3
   }
  ],
  "exits": [
   {
    "id": "R",
    "color": "R",
    "x": 4,
    "y": 0
   },
   {
    "id": "B",
    "color": "B",
    "x": 6,
    "y": 0
   },
   {
    "id": "G",
    "color": "G",
    "x": 2,
    "y": 0
   }
  ],
  "orders": [
   {
    "id": "P01",
    "source": "I1",
    "color": "B",
    "release": 1,
    "urgent": true,
    "due": 17
   },
   {
    "id": "P02",
    "source": "I2",
    "color": "G",
    "release": 3,
    "urgent": false,
    "due": 21
   },
   {
    "id": "P03",
    "source": "I3",
    "color": "R",
    "release": 5,
    "urgent": false,
    "due": 21
   },
   {
    "id": "P04",
    "source": "I1",
    "color": "G",
    "release": 8,
    "urgent": false,
    "due": 26
   },
   {
    "id": "P05",
    "source": "I2",
    "color": "R",
    "release": 10,
    "urgent": true,
    "due": 24
   },
   {
    "id": "P06",
    "source": "I3",
    "color": "B",
    "release": 12,
    "urgent": false,
    "due": 30
   },
   {
    "id": "P07",
    "source": "I1",
    "color": "R",
    "release": 15,
    "urgent": false,
    "due": 31
   },
   {
    "id": "P08",
    "source": "I2",
    "color": "B",
    "release": 17,
    "urgent": false,
    "due": 35
   },
   {
    "id": "P09",
    "source": "I3",
    "color": "G",
    "release": 19,
    "urgent": true,
    "due": 42
   },
   {
    "id": "P10",
    "source": "I1",
    "color": "B",
    "release": 22,
    "urgent": false,
    "due": 46
   },
   {
    "id": "P11",
    "source": "I2",
    "color": "G",
    "release": 24,
    "urgent": false,
    "due": 48
   },
   {
    "id": "P12",
    "source": "I3",
    "color": "R",
    "release": 26,
    "urgent": false,
    "due": 48
   },
   {
    "id": "P13",
    "source": "I1",
    "color": "G",
    "release": 29,
    "urgent": true,
    "due": 50
   },
   {
    "id": "P14",
    "source": "I2",
    "color": "R",
    "release": 31,
    "urgent": false,
    "due": 52
   },
   {
    "id": "P15",
    "source": "I3",
    "color": "B",
    "release": 33,
    "urgent": false,
    "due": 56
   },
   {
    "id": "P16",
    "source": "I1",
    "color": "R",
    "release": 36,
    "urgent": false,
    "due": 58
   },
   {
    "id": "P17",
    "source": "I2",
    "color": "B",
    "release": 38,
    "urgent": true,
    "due": 56
   },
   {
    "id": "P18",
    "source": "I3",
    "color": "G",
    "release": 40,
    "urgent": false,
    "due": 62
   },
   {
    "id": "P19",
    "source": "I1",
    "color": "B",
    "release": 43,
    "urgent": false,
    "due": 64
   },
   {
    "id": "P20",
    "source": "I2",
    "color": "G",
    "release": 45,
    "urgent": false,
    "due": 66
   },
   {
    "id": "P21",
    "source": "I3",
    "color": "R",
    "release": 47,
    "urgent": true,
    "due": 64
   },
   {
    "id": "P22",
    "source": "I1",
    "color": "G",
    "release": 50,
    "urgent": false,
    "due": 70
   },
   {
    "id": "P23",
    "source": "I2",
    "color": "R",
    "release": 52,
    "urgent": false,
    "due": 70
   },
   {
    "id": "P24",
    "source": "I3",
    "color": "B",
    "release": 54,
    "urgent": false,
    "due": 74
   },
   {
    "id": "P25",
    "source": "I1",
    "color": "R",
    "release": 57,
    "urgent": true,
    "due": 72
   }
  ],
  "maintenance": [
   {
    "x": 4,
    "y": 5,
    "start": 27,
    "end": 33
   }
  ],
  "budget": 35,
  "maxTicks": 180,
  "starter": [],
  "brief": "세 투입구의 급행 주문, 제한 예산과 정비 구간을 동시에 해결하세요.",
  "hint": "직선 벨트만으로는 합류가 막힙니다. 합류 직후 버퍼를 두고, R은 직진 · B는 우회전 · G는 좌회전하는 분류기를 이용해 보세요."
 },
 {
  "id": 9,
  "name": "뒤집힌 운송장",
  "chapter": 3,
  "grade": "MASTER",
  "width": 11,
  "height": 9,
  "blocked": [
   {
    "x": 0,
    "y": 0
   },
   {
    "x": 1,
    "y": 0
   },
   {
    "x": 2,
    "y": 0
   },
   {
    "x": 3,
    "y": 0
   },
   {
    "x": 4,
    "y": 0
   },
   {
    "x": 5,
    "y": 0
   },
   {
    "x": 6,
    "y": 0
   },
   {
    "x": 7,
    "y": 0
   },
   {
    "x": 8,
    "y": 0
   },
   {
    "x": 9,
    "y": 0
   },
   {
    "x": 10,
    "y": 0
   },
   {
    "x": 5,
    "y": 1
   },
   {
    "x": 3,
    "y": 2
   },
   {
    "x": 4,
    "y": 2
   },
   {
    "x": 5,
    "y": 2
   },
   {
    "x": 3,
    "y": 3
   },
   {
    "x": 5,
    "y": 3
   },
   {
    "x": 1,
    "y": 5
   },
   {
    "x": 3,
    "y": 5
   },
   {
    "x": 5,
    "y": 5
   },
   {
    "x": 8,
    "y": 5
   },
   {
    "x": 3,
    "y": 6
   },
   {
    "x": 5,
    "y": 6
   },
   {
    "x": 7,
    "y": 6
   },
   {
    "x": 0,
    "y": 8
   },
   {
    "x": 1,
    "y": 8
   },
   {
    "x": 2,
    "y": 8
   },
   {
    "x": 3,
    "y": 8
   },
   {
    "x": 4,
    "y": 8
   },
   {
    "x": 5,
    "y": 8
   },
   {
    "x": 6,
    "y": 8
   },
   {
    "x": 7,
    "y": 8
   },
   {
    "x": 8,
    "y": 8
   },
   {
    "x": 9,
    "y": 8
   },
   {
    "x": 10,
    "y": 8
   }
  ],
  "sources": [
   {
    "id": "I1",
    "x": 0,
    "y": 1,
    "dir": 0
   },
   {
    "id": "I2",
    "x": 0,
    "y": 4,
    "dir": 0
   },
   {
    "id": "I3",
    "x": 0,
    "y": 7,
    "dir": 0
   }
  ],
  "exits": [
   {
    "id": "R",
    "color": "R",
    "x": 10,
    "y": 4
   },
   {
    "id": "B",
    "color": "B",
    "x": 10,
    "y": 7
   },
   {
    "id": "G",
    "color": "G",
    "x": 10,
    "y": 1
   }
  ],
  "orders": [
   {
    "id": "P01",
    "source": "I1",
    "color": "G",
    "release": 1,
    "urgent": true,
    "due": 20
   },
   {
    "id": "P02",
    "source": "I2",
    "color": "R",
    "release": 3,
    "urgent": false,
    "due": 17
   },
   {
    "id": "P03",
    "source": "I3",
    "color": "B",
    "release": 5,
    "urgent": false,
    "due": 25
   },
   {
    "id": "P04",
    "source": "I1",
    "color": "R",
    "release": 8,
    "urgent": false,
    "due": 26
   },
   {
    "id": "P05",
    "source": "I2",
    "color": "B",
    "release": 10,
    "urgent": true,
    "due": 25
   },
   {
    "id": "P06",
    "source": "I3",
    "color": "G",
    "release": 12,
    "urgent": false,
    "due": 32
   },
   {
    "id": "P07",
    "source": "I1",
    "color": "B",
    "release": 15,
    "urgent": false,
    "due": 36
   },
   {
    "id": "P08",
    "source": "I2",
    "color": "G",
    "release": 17,
    "urgent": false,
    "due": 34
   },
   {
    "id": "P09",
    "source": "I3",
    "color": "R",
    "release": 19,
    "urgent": true,
    "due": 34
   },
   {
    "id": "P10",
    "source": "I1",
    "color": "G",
    "release": 22,
    "urgent": false,
    "due": 50
   },
   {
    "id": "P11",
    "source": "I2",
    "color": "R",
    "release": 24,
    "urgent": false,
    "due": 45
   },
   {
    "id": "P12",
    "source": "I3",
    "color": "B",
    "release": 26,
    "urgent": false,
    "due": 52
   },
   {
    "id": "P13",
    "source": "I1",
    "color": "R",
    "release": 29,
    "urgent": true,
    "due": 51
   },
   {
    "id": "P14",
    "source": "I2",
    "color": "B",
    "release": 31,
    "urgent": false,
    "due": 54
   },
   {
    "id": "P15",
    "source": "I3",
    "color": "G",
    "release": 33,
    "urgent": false,
    "due": 58
   },
   {
    "id": "P16",
    "source": "I1",
    "color": "B",
    "release": 36,
    "urgent": false,
    "due": 62
   },
   {
    "id": "P17",
    "source": "I2",
    "color": "G",
    "release": 38,
    "urgent": true,
    "due": 58
   },
   {
    "id": "P18",
    "source": "I3",
    "color": "R",
    "release": 40,
    "urgent": false,
    "due": 61
   },
   {
    "id": "P19",
    "source": "I1",
    "color": "G",
    "release": 43,
    "urgent": false,
    "due": 68
   },
   {
    "id": "P20",
    "source": "I2",
    "color": "R",
    "release": 45,
    "urgent": false,
    "due": 63
   },
   {
    "id": "P21",
    "source": "I3",
    "color": "B",
    "release": 47,
    "urgent": true,
    "due": 68
   },
   {
    "id": "P22",
    "source": "I1",
    "color": "R",
    "release": 50,
    "urgent": false,
    "due": 71
   },
   {
    "id": "P23",
    "source": "I2",
    "color": "B",
    "release": 52,
    "urgent": false,
    "due": 72
   },
   {
    "id": "P24",
    "source": "I3",
    "color": "G",
    "release": 54,
    "urgent": false,
    "due": 76
   },
   {
    "id": "P25",
    "source": "I1",
    "color": "B",
    "release": 57,
    "urgent": true,
    "due": 78
   },
   {
    "id": "P26",
    "source": "I2",
    "color": "G",
    "release": 59,
    "urgent": false,
    "due": 78
   }
  ],
  "maintenance": [
   {
    "x": 3,
    "y": 4,
    "start": 28,
    "end": 34
   }
  ],
  "budget": 39,
  "maxTicks": 180,
  "starter": [],
  "brief": "세 투입구의 급행 주문, 제한 예산과 정비 구간을 동시에 해결하세요.",
  "hint": "직선 벨트만으로는 합류가 막힙니다. 합류 직후 버퍼를 두고, R은 직진 · B는 우회전 · G는 좌회전하는 분류기를 이용해 보세요."
 },
 {
  "id": 10,
  "name": "정비의 빈틈",
  "chapter": 4,
  "grade": "MASTER",
  "width": 9,
  "height": 11,
  "blocked": [
   {
    "x": 8,
    "y": 0
   },
   {
    "x": 8,
    "y": 1
   },
   {
    "x": 8,
    "y": 2
   },
   {
    "x": 8,
    "y": 3
   },
   {
    "x": 8,
    "y": 4
   },
   {
    "x": 8,
    "y": 5
   },
   {
    "x": 8,
    "y": 6
   },
   {
    "x": 8,
    "y": 7
   },
   {
    "x": 8,
    "y": 8
   },
   {
    "x": 8,
    "y": 9
   },
   {
    "x": 8,
    "y": 10
   },
   {
    "x": 7,
    "y": 4
   },
   {
    "x": 6,
    "y": 4
   },
   {
    "x": 6,
    "y": 6
   },
   {
    "x": 5,
    "y": 2
   },
   {
    "x": 5,
    "y": 4
   },
   {
    "x": 5,
    "y": 6
   },
   {
    "x": 5,
    "y": 9
   },
   {
    "x": 3,
    "y": 4
   },
   {
    "x": 3,
    "y": 6
   },
   {
    "x": 2,
    "y": 6
   },
   {
    "x": 1,
    "y": 4
   },
   {
    "x": 1,
    "y": 5
   },
   {
    "x": 1,
    "y": 6
   },
   {
    "x": 0,
    "y": 0
   },
   {
    "x": 0,
    "y": 1
   },
   {
    "x": 0,
    "y": 2
   },
   {
    "x": 0,
    "y": 3
   },
   {
    "x": 0,
    "y": 4
   },
   {
    "x": 0,
    "y": 5
   },
   {
    "x": 0,
    "y": 6
   },
   {
    "x": 0,
    "y": 7
   },
   {
    "x": 0,
    "y": 8
   },
   {
    "x": 0,
    "y": 9
   },
   {
    "x": 0,
    "y": 10
   }
  ],
  "sources": [
   {
    "id": "I1",
    "x": 6,
    "y": 0,
    "dir": 1
   },
   {
    "id": "I2",
    "x": 4,
    "y": 0,
    "dir": 1
   },
   {
    "id": "I3",
    "x": 1,
    "y": 0,
    "dir": 1
   }
  ],
  "exits": [
   {
    "id": "R",
    "color": "R",
    "x": 4,
    "y": 10
   },
   {
    "id": "B",
    "color": "B",
    "x": 2,
    "y": 10
   },
   {
    "id": "G",
    "color": "G",
    "x": 7,
    "y": 10
   }
  ],
  "orders": [
   {
    "id": "P01",
    "source": "I1",
    "color": "R",
    "release": 1,
    "urgent": true,
    "due": 15
   },
   {
    "id": "P02",
    "source": "I2",
    "color": "B",
    "release": 3,
    "urgent": false,
    "due": 21
   },
   {
    "id": "P03",
    "source": "I3",
    "color": "G",
    "release": 5,
    "urgent": false,
    "due": 25
   },
   {
    "id": "P04",
    "source": "I1",
    "color": "B",
    "release": 8,
    "urgent": false,
    "due": 26
   },
   {
    "id": "P05",
    "source": "I2",
    "color": "G",
    "release": 10,
    "urgent": true,
    "due": 27
   },
   {
    "id": "P06",
    "source": "I3",
    "color": "R",
    "release": 12,
    "urgent": false,
    "due": 29
   },
   {
    "id": "P07",
    "source": "I1",
    "color": "G",
    "release": 15,
    "urgent": false,
    "due": 34
   },
   {
    "id": "P08",
    "source": "I2",
    "color": "R",
    "release": 17,
    "urgent": false,
    "due": 33
   },
   {
    "id": "P09",
    "source": "I3",
    "color": "B",
    "release": 19,
    "urgent": true,
    "due": 36
   },
   {
    "id": "P10",
    "source": "I1",
    "color": "R",
    "release": 22,
    "urgent": false,
    "due": 45
   },
   {
    "id": "P11",
    "source": "I2",
    "color": "B",
    "release": 24,
    "urgent": false,
    "due": 49
   },
   {
    "id": "P12",
    "source": "I3",
    "color": "G",
    "release": 26,
    "urgent": false,
    "due": 52
   },
   {
    "id": "P13",
    "source": "I1",
    "color": "B",
    "release": 29,
    "urgent": true,
    "due": 51
   },
   {
    "id": "P14",
    "source": "I2",
    "color": "G",
    "release": 31,
    "urgent": false,
    "due": 56
   },
   {
    "id": "P15",
    "source": "I3",
    "color": "R",
    "release": 33,
    "urgent": false,
    "due": 55
   },
   {
    "id": "P16",
    "source": "I1",
    "color": "G",
    "release": 36,
    "urgent": false,
    "due": 62
   },
   {
    "id": "P17",
    "source": "I2",
    "color": "R",
    "release": 38,
    "urgent": true,
    "due": 55
   },
   {
    "id": "P18",
    "source": "I3",
    "color": "B",
    "release": 40,
    "urgent": false,
    "due": 63
   },
   {
    "id": "P19",
    "source": "I1",
    "color": "R",
    "release": 43,
    "urgent": false,
    "due": 63
   },
   {
    "id": "P20",
    "source": "I2",
    "color": "B",
    "release": 45,
    "urgent": false,
    "due": 67
   },
   {
    "id": "P21",
    "source": "I3",
    "color": "G",
    "release": 47,
    "urgent": true,
    "due": 68
   },
   {
    "id": "P22",
    "source": "I1",
    "color": "B",
    "release": 50,
    "urgent": false,
    "due": 71
   },
   {
    "id": "P23",
    "source": "I2",
    "color": "G",
    "release": 52,
    "urgent": false,
    "due": 74
   },
   {
    "id": "P24",
    "source": "I3",
    "color": "R",
    "release": 54,
    "urgent": false,
    "due": 73
   },
   {
    "id": "P25",
    "source": "I1",
    "color": "G",
    "release": 57,
    "urgent": true,
    "due": 76
   },
   {
    "id": "P26",
    "source": "I2",
    "color": "R",
    "release": 59,
    "urgent": false,
    "due": 77
   },
   {
    "id": "P27",
    "source": "I3",
    "color": "B",
    "release": 61,
    "urgent": false,
    "due": 81
   }
  ],
  "maintenance": [
   {
    "x": 4,
    "y": 4,
    "start": 29,
    "end": 35
   }
  ],
  "budget": 37,
  "maxTicks": 180,
  "starter": [],
  "brief": "세 투입구의 급행 주문, 제한 예산과 정비 구간을 동시에 해결하세요.",
  "hint": "직선 벨트만으로는 합류가 막힙니다. 합류 직후 버퍼를 두고, R은 직진 · B는 우회전 · G는 좌회전하는 분류기를 이용해 보세요."
 },
 {
  "id": 11,
  "name": "한 칸의 여유",
  "chapter": 4,
  "grade": "MASTER",
  "width": 11,
  "height": 9,
  "blocked": [
   {
    "x": 10,
    "y": 8
   },
   {
    "x": 9,
    "y": 8
   },
   {
    "x": 8,
    "y": 8
   },
   {
    "x": 7,
    "y": 8
   },
   {
    "x": 6,
    "y": 8
   },
   {
    "x": 5,
    "y": 8
   },
   {
    "x": 4,
    "y": 8
   },
   {
    "x": 3,
    "y": 8
   },
   {
    "x": 2,
    "y": 8
   },
   {
    "x": 1,
    "y": 8
   },
   {
    "x": 0,
    "y": 8
   },
   {
    "x": 7,
    "y": 7
   },
   {
    "x": 3,
    "y": 7
   },
   {
    "x": 9,
    "y": 5
   },
   {
    "x": 7,
    "y": 5
   },
   {
    "x": 3,
    "y": 5
   },
   {
    "x": 7,
    "y": 3
   },
   {
    "x": 4,
    "y": 3
   },
   {
    "x": 3,
    "y": 3
   },
   {
    "x": 7,
    "y": 2
   },
   {
    "x": 5,
    "y": 2
   },
   {
    "x": 3,
    "y": 2
   },
   {
    "x": 6,
    "y": 1
   },
   {
    "x": 10,
    "y": 0
   },
   {
    "x": 9,
    "y": 0
   },
   {
    "x": 8,
    "y": 0
   },
   {
    "x": 7,
    "y": 0
   },
   {
    "x": 6,
    "y": 0
   },
   {
    "x": 5,
    "y": 0
   },
   {
    "x": 4,
    "y": 0
   },
   {
    "x": 3,
    "y": 0
   },
   {
    "x": 2,
    "y": 0
   },
   {
    "x": 1,
    "y": 0
   },
   {
    "x": 0,
    "y": 0
   }
  ],
  "sources": [
   {
    "id": "I1",
    "x": 10,
    "y": 7,
    "dir": 2
   },
   {
    "id": "I2",
    "x": 10,
    "y": 4,
    "dir": 2
   },
   {
    "id": "I3",
    "x": 10,
    "y": 2,
    "dir": 2
   }
  ],
  "exits": [
   {
    "id": "R",
    "color": "R",
    "x": 0,
    "y": 4
   },
   {
    "id": "B",
    "color": "B",
    "x": 0,
    "y": 1
   },
   {
    "id": "G",
    "color": "G",
    "x": 0,
    "y": 6
   }
  ],
  "orders": [
   {
    "id": "P01",
    "source": "I1",
    "color": "B",
    "release": 1,
    "urgent": true,
    "due": 20
   },
   {
    "id": "P02",
    "source": "I2",
    "color": "G",
    "release": 3,
    "urgent": false,
    "due": 19
   },
   {
    "id": "P03",
    "source": "I3",
    "color": "R",
    "release": 5,
    "urgent": false,
    "due": 21
   },
   {
    "id": "P04",
    "source": "I1",
    "color": "G",
    "release": 8,
    "urgent": false,
    "due": 28
   },
   {
    "id": "P05",
    "source": "I2",
    "color": "R",
    "release": 10,
    "urgent": true,
    "due": 22
   },
   {
    "id": "P06",
    "source": "I3",
    "color": "B",
    "release": 12,
    "urgent": false,
    "due": 31
   },
   {
    "id": "P07",
    "source": "I1",
    "color": "R",
    "release": 15,
    "urgent": false,
    "due": 33
   },
   {
    "id": "P08",
    "source": "I2",
    "color": "B",
    "release": 17,
    "urgent": false,
    "due": 34
   },
   {
    "id": "P09",
    "source": "I3",
    "color": "G",
    "release": 19,
    "urgent": true,
    "due": 35
   },
   {
    "id": "P10",
    "source": "I1",
    "color": "B",
    "release": 22,
    "urgent": false,
    "due": 50
   },
   {
    "id": "P11",
    "source": "I2",
    "color": "G",
    "release": 24,
    "urgent": false,
    "due": 40
   },
   {
    "id": "P12",
    "source": "I3",
    "color": "R",
    "release": 26,
    "urgent": false,
    "due": 49
   },
   {
    "id": "P13",
    "source": "I1",
    "color": "G",
    "release": 29,
    "urgent": true,
    "due": 53
   },
   {
    "id": "P14",
    "source": "I2",
    "color": "R",
    "release": 31,
    "urgent": false,
    "due": 51
   },
   {
    "id": "P15",
    "source": "I3",
    "color": "B",
    "release": 33,
    "urgent": false,
    "due": 58
   },
   {
    "id": "P16",
    "source": "I1",
    "color": "R",
    "release": 36,
    "urgent": false,
    "due": 59
   },
   {
    "id": "P17",
    "source": "I2",
    "color": "B",
    "release": 38,
    "urgent": true,
    "due": 58
   },
   {
    "id": "P18",
    "source": "I3",
    "color": "G",
    "release": 40,
    "urgent": false,
    "due": 63
   },
   {
    "id": "P19",
    "source": "I1",
    "color": "B",
    "release": 43,
    "urgent": false,
    "due": 68
   },
   {
    "id": "P20",
    "source": "I2",
    "color": "G",
    "release": 45,
    "urgent": false,
    "due": 65
   },
   {
    "id": "P21",
    "source": "I3",
    "color": "R",
    "release": 47,
    "urgent": true,
    "due": 65
   },
   {
    "id": "P22",
    "source": "I1",
    "color": "G",
    "release": 50,
    "urgent": false,
    "due": 73
   },
   {
    "id": "P23",
    "source": "I2",
    "color": "R",
    "release": 52,
    "urgent": false,
    "due": 69
   },
   {
    "id": "P24",
    "source": "I3",
    "color": "B",
    "release": 54,
    "urgent": false,
    "due": 76
   },
   {
    "id": "P25",
    "source": "I1",
    "color": "R",
    "release": 57,
    "urgent": true,
    "due": 75
   },
   {
    "id": "P26",
    "source": "I2",
    "color": "B",
    "release": 59,
    "urgent": false,
    "due": 78
   },
   {
    "id": "P27",
    "source": "I3",
    "color": "G",
    "release": 61,
    "urgent": false,
    "due": 81
   },
   {
    "id": "P28",
    "source": "I1",
    "color": "B",
    "release": 64,
    "urgent": false,
    "due": 84
   }
  ],
  "maintenance": [
   {
    "x": 7,
    "y": 4,
    "start": 30,
    "end": 36
   }
  ],
  "budget": 33,
  "maxTicks": 180,
  "starter": [],
  "brief": "세 투입구의 급행 주문, 제한 예산과 정비 구간을 동시에 해결하세요.",
  "hint": "직선 벨트만으로는 합류가 막힙니다. 합류 직후 버퍼를 두고, R은 직진 · B는 우회전 · G는 좌회전하는 분류기를 이용해 보세요."
 },
 {
  "id": 12,
  "name": "마지막 마감",
  "chapter": 4,
  "grade": "MASTER",
  "width": 9,
  "height": 11,
  "blocked": [
   {
    "x": 0,
    "y": 10
   },
   {
    "x": 0,
    "y": 9
   },
   {
    "x": 0,
    "y": 8
   },
   {
    "x": 0,
    "y": 7
   },
   {
    "x": 0,
    "y": 6
   },
   {
    "x": 0,
    "y": 5
   },
   {
    "x": 0,
    "y": 4
   },
   {
    "x": 0,
    "y": 3
   },
   {
    "x": 0,
    "y": 2
   },
   {
    "x": 0,
    "y": 1
   },
   {
    "x": 0,
    "y": 0
   },
   {
    "x": 1,
    "y": 8
   },
   {
    "x": 1,
    "y": 5
   },
   {
    "x": 1,
    "y": 1
   },
   {
    "x": 3,
    "y": 5
   },
   {
    "x": 3,
    "y": 3
   },
   {
    "x": 5,
    "y": 5
   },
   {
    "x": 7,
    "y": 7
   },
   {
    "x": 7,
    "y": 5
   },
   {
    "x": 8,
    "y": 10
   },
   {
    "x": 8,
    "y": 9
   },
   {
    "x": 8,
    "y": 8
   },
   {
    "x": 8,
    "y": 7
   },
   {
    "x": 8,
    "y": 6
   },
   {
    "x": 8,
    "y": 5
   },
   {
    "x": 8,
    "y": 4
   },
   {
    "x": 8,
    "y": 3
   },
   {
    "x": 8,
    "y": 2
   },
   {
    "x": 8,
    "y": 1
   },
   {
    "x": 8,
    "y": 0
   }
  ],
  "sources": [
   {
    "id": "I1",
    "x": 2,
    "y": 10,
    "dir": 3
   },
   {
    "id": "I2",
    "x": 4,
    "y": 10,
    "dir": 3
   },
   {
    "id": "I3",
    "x": 6,
    "y": 10,
    "dir": 3
   }
  ],
  "exits": [
   {
    "id": "R",
    "color": "R",
    "x": 4,
    "y": 0
   },
   {
    "id": "B",
    "color": "B",
    "x": 6,
    "y": 0
   },
   {
    "id": "G",
    "color": "G",
    "x": 2,
    "y": 0
   }
  ],
  "orders": [
   {
    "id": "P01",
    "source": "I1",
    "color": "G",
    "release": 1,
    "urgent": true,
    "due": 17
   },
   {
    "id": "P02",
    "source": "I2",
    "color": "R",
    "release": 3,
    "urgent": false,
    "due": 19
   },
   {
    "id": "P03",
    "source": "I3",
    "color": "B",
    "release": 5,
    "urgent": false,
    "due": 23
   },
   {
    "id": "P04",
    "source": "I1",
    "color": "R",
    "release": 8,
    "urgent": false,
    "due": 24
   },
   {
    "id": "P05",
    "source": "I2",
    "color": "B",
    "release": 10,
    "urgent": true,
    "due": 26
   },
   {
    "id": "P06",
    "source": "I3",
    "color": "G",
    "release": 12,
    "urgent": false,
    "due": 30
   },
   {
    "id": "P07",
    "source": "I1",
    "color": "B",
    "release": 15,
    "urgent": false,
    "due": 33
   },
   {
    "id": "P08",
    "source": "I2",
    "color": "G",
    "release": 17,
    "urgent": false,
    "due": 35
   },
   {
    "id": "P09",
    "source": "I3",
    "color": "R",
    "release": 19,
    "urgent": true,
    "due": 33
   },
   {
    "id": "P10",
    "source": "I1",
    "color": "G",
    "release": 22,
    "urgent": false,
    "due": 40
   },
   {
    "id": "P11",
    "source": "I2",
    "color": "R",
    "release": 24,
    "urgent": false,
    "due": 47
   },
   {
    "id": "P12",
    "source": "I3",
    "color": "B",
    "release": 26,
    "urgent": false,
    "due": 51
   },
   {
    "id": "P13",
    "source": "I1",
    "color": "R",
    "release": 29,
    "urgent": true,
    "due": 49
   },
   {
    "id": "P14",
    "source": "I2",
    "color": "B",
    "release": 31,
    "urgent": false,
    "due": 55
   },
   {
    "id": "P15",
    "source": "I3",
    "color": "G",
    "release": 33,
    "urgent": false,
    "due": 57
   },
   {
    "id": "P16",
    "source": "I1",
    "color": "B",
    "release": 36,
    "urgent": false,
    "due": 61
   },
   {
    "id": "P17",
    "source": "I2",
    "color": "G",
    "release": 38,
    "urgent": true,
    "due": 57
   },
   {
    "id": "P18",
    "source": "I3",
    "color": "R",
    "release": 40,
    "urgent": false,
    "due": 61
   },
   {
    "id": "P19",
    "source": "I1",
    "color": "G",
    "release": 43,
    "urgent": false,
    "due": 65
   },
   {
    "id": "P20",
    "source": "I2",
    "color": "R",
    "release": 45,
    "urgent": false,
    "due": 65
   },
   {
    "id": "P21",
    "source": "I3",
    "color": "B",
    "release": 47,
    "urgent": true,
    "due": 67
   },
   {
    "id": "P22",
    "source": "I1",
    "color": "R",
    "release": 50,
    "urgent": false,
    "due": 69
   },
   {
    "id": "P23",
    "source": "I2",
    "color": "B",
    "release": 52,
    "urgent": false,
    "due": 73
   },
   {
    "id": "P24",
    "source": "I3",
    "color": "G",
    "release": 54,
    "urgent": false,
    "due": 75
   },
   {
    "id": "P25",
    "source": "I1",
    "color": "B",
    "release": 57,
    "urgent": true,
    "due": 75
   },
   {
    "id": "P26",
    "source": "I2",
    "color": "G",
    "release": 59,
    "urgent": false,
    "due": 79
   },
   {
    "id": "P27",
    "source": "I3",
    "color": "R",
    "release": 61,
    "urgent": false,
    "due": 79
   },
   {
    "id": "P28",
    "source": "I1",
    "color": "G",
    "release": 64,
    "urgent": false,
    "due": 83
   },
   {
    "id": "P29",
    "source": "I2",
    "color": "R",
    "release": 66,
    "urgent": true,
    "due": 81
   }
  ],
  "maintenance": [
   {
    "x": 4,
    "y": 5,
    "start": 31,
    "end": 37
   }
  ],
  "budget": 37,
  "maxTicks": 180,
  "starter": [],
  "brief": "세 투입구의 급행 주문, 제한 예산과 정비 구간을 동시에 해결하세요.",
  "hint": "직선 벨트만으로는 합류가 막힙니다. 합류 직후 버퍼를 두고, R은 직진 · B는 우회전 · G는 좌회전하는 분류기를 이용해 보세요."
 }
];
export const levels=Object.freeze(data.map(level=>Object.freeze(level)));
export const contracts=Object.freeze([...extraContracts.filter(l=>l.id===0),...levels,...extraContracts.filter(l=>l.id!==0)]);
export function getLevel(id){const level=contracts.find(l=>l.id===id);if(!level)throw new RangeError("Unknown contract");return level;}
