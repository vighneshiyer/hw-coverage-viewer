class CodeLine {
  constructor(line_number, line){
      this.line_number = line_number;
      this.line = line;
      this.line_count = 0;
  }
}

class CodeBlock {
  constructor(file_name, code_lines) {
      this.file_name = file_name;
      this.code_lines = code_lines;
  }
}
class CoverageEntry {
  constructor(file, line, path, count) {
  this.file = file;
  this.line = line;
  this.path = path;
  this.count = count;

  }
}
function parse_line(line) {
  var arr = line.split("\'")

  var file = ""
  var line = ""
  var path = ""
  var count = parseInt(arr[2].trim());

  var arr2 = arr[1].split('\u0001');
  for (var i = 0; i < arr2.length; i++) {
      var key_value_pair = arr2[i].split('\u0002')
      if (key_value_pair[0] === 'f'){
          file = key_value_pair[1]
      }
      if (key_value_pair[0] === 'l'){
          line = key_value_pair[1]
      }
      if (key_value_pair[0] === 'page'){
          path = key_value_pair[1]
      }
  }
  const new_entry = new CoverageEntry(file, line, path, count);
  return new_entry
}

function parse_data(data) {
  var parsed_lines = [];
  const lines = data.split("\n");
  for (var i = 1; i < lines.length-1; ++i) {
      parsed_lines.push(parse_line(lines[i]));
  }
  return parsed_lines;
}
module.exports = parse_line;
