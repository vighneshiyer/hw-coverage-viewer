import { describe, it, expect, toBe } from 'vitest'

import parse_line from 'cov/parser'

describe('parser', () => {
  it('should run', () => {
      console.log(parse_line("C 'falu.vl12n5pagev_line/aluoblockS12hTOP.alu' 109"))
     //expect(sum(1, 2)).toBe(3);
  })
})
