export { parse_line,parse_data };

class CodeLine {
  line_number: number;
  line: string;
  line_count: number;

  constructor(line_number: number, line: string) {
      this.line_number = line_number;
      this.line = line;
      this.line_count = 0;
  }
}

class CodeBlock {
  file_name: string;
  code_lines: CodeLine[];

  constructor(file_name: string, code_lines: CodeLine[]) {
      this.file_name = file_name;
      this.code_lines = code_lines;
  }
}

class CoverageEntry {
  file: string;
  line: string;
  path: string;
  count: number;

  constructor(file: string, line: string, path: string, count: number) {
  this.file = file;
  this.line = line;
  this.path = path;
  this.count = count;
  }
}

function parse_line(line: string): CoverageEntry {
  let arr = line.split("\'");

  let file = "";
  let line_num = "";
  let path = "";
  let count=0;
  let arr2=[];
  if (arr.length >= 3) {
    count = parseInt(arr[2].trim(), 10);
  }
  if (arr.length >=2){
    arr2 = arr[1].split("\u0001");
  }
  for (const i in arr2) {
    const keyValuePair = arr2[i].split("\u0002");
    if (keyValuePair[0] === "f") {
      file = keyValuePair[1];
      }
    if (keyValuePair[0] === "l") {
      line_num = keyValuePair[1];
      }
    if (keyValuePair[0] === "page") {
      path = keyValuePair[1];
      }
  }
  let newEntry = new CoverageEntry(file, line_num, path, count);
  return newEntry;
}

function parse_data(data: string): CoverageEntry[] {
  let parsedLines: CoverageEntry[] = [];
  let lines = data.split("\n");
  for (let i = 0; i < lines.length; ++i) {
    parsedLines.push(parse_line(lines[i]));
  }
  return parsedLines;
}

export default parse_line;
