## แมพมีอะไรบ้าง~

- พื้นดินปกติ
- พื้นดินติด effects
  - เดินช้า
  - เดินเร็ว
- สิ่งกีดขวาง
  - กำแพง (พังไม่ได้)
  - กล่อง (พังได้)
- พื้นที่เกิด (อย่างน้อย 10 จุด)
- จุดสุ่มกล่องเลือด

## JSON Files

```json
{
  "name": "map name",
  "description": "map desc",
  "size": [x, y], //map size
  "floor": [ // array of each floor
    [n, n, n, ...],
    ...
  ],
  "wall": [ // array of wall list
    [x, y, width, height, type],
    ...
  ],
  "box": [ // array of box list
    [x, y, type],
    ...
  ],
  "spawn": [ //array of spawn points (10 points)
    [x, y],
    ...
  ]
}
```
