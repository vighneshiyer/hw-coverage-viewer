import { describe, it, expect, test } from 'vitest'

import {parse_line, parse_data} from './parser'

describe('parser', () => {
  it('should run', () => {
      console.log(parse_line("C 'falu.vl12n5pagev_line/aluoblockS12hTOP.alu' 109"));
      console.log(parse_data("C 'falu.vl12n5pagev_line/aluoblockS12hTOP.alu' 109\nC '\x01f\x02Test1Module.sv\x01l\x0240\x01n\x020\x01page\x02v_user/Test1Module\x01o\x02cover\x01h\x02TOP.Test1Module' 3\nC '\x01f\x02Test1Module.sv\x01l\x028\x01n\x020\x01page\x02v_user/SubModule1\x01o\x02cover\x01h\x02TOP.Test1Module.c0' 0\nC '\x01f\x02Test1Module.sv\x01l\x028\x01n\x020\x01page\x02v_user/SubModule1\x01o\x02cover\x01h\x02TOP.Test1Module.c1' 0"));
      expect(1+2).toBe(3);
  })

  it('should parse a line', () => {
    const line = "C '\u0001f\u0002alu.v\u0001l\u000212\u0001n\u00025\u0001page\u0002v_line/alu\u0001o\u0002block\u0001S\u000212\u0001h\u0002TOP.alu' 109";
    const result = parse_line(line);
    expect(result.file).toBe('alu.v');
    expect(result.line).toBe('12');
    expect(result.path).toBe('v_line/alu');
    expect(result.count).toBe(109);
  });

  it('should parse data', () => {
    const data = "C '\u0001f\u0002alu.v\u0001l\u000212\u0001n\u00025\u0001page\u0002v_line/alu\u0001o\u0002block\u0001S\u000212\u0001h\u0002TOP.alu' 109";
    const result = parse_data(data);
    expect(result.length).toBe(1);
    expect(result[0].file).toBe('alu.v');
    expect(result[0].line).toBe('12');
    expect(result[0].path).toBe('v_line/alu');
    expect(result[0].count).toBe(109);
  });
})


