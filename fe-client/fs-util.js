var nrc = require('node-run-cmd');

var fs = require("fs");

var shorts = ['adr','anc',
  'acs',
  'blk',
  'btn',
  'chk',
  'cur',
  'dat',
  'dti',
  'eml',
  'file',
  'fst',
  'hid',
  'html',
  'icb',
  'mon',
  'msl',
  'num',

  'pwd',
  'phn',
  'rad',
  'sel',
  'sign',
  'tim',
  'txa',
  'txt'
];
var full =  [ 'address',
'anchor',
'autoComplete',
'blank',
'button',
'checkbox',
'currency',
'date',
'dateTime',
'email',
'file',
'fieldSet',
'hidden',
'html',
'iconicButton',
'month',
'multiSelect',
'number',
'password',
'phone',
'radio',
'select',
'signature',
'time',
'textArea',
'text'
 ];
var maps = {};
 for( var i=0; i<shorts.length;i++ ) {
   maps[shorts[i]]=full[i];
 }
 /*
 { adr: 'address',
  anc: 'anchor',
  acs: 'autoComplete',
  blk: 'blank',
  btn: 'button',
  chk: 'checkbox',
  cur: 'currency',
  dat: 'date',
  dti: 'dateTime',
  eml: 'email',
  file: 'file',
  fst: 'fieldSet',
  hid: 'hidden',
  html: 'html',
  icb: 'iconicButton',
  mon: 'month',
  msl: 'multiSelect',
  num: 'number',
  pwd: 'password',
  phn: 'phone',
  rad: 'radio',
  sel: 'select',
  sign: 'signature',
  tim: 'time',
  txa: 'textArea',
  txt: 'text' }

 */
/* console.log("full", full);
for( var i=0; i<shorts.length;i++ ) {
  var shortName = shorts[i];
  var fullName = maps[shortName];
  fs.renameSync('./'+shortName,'./'+fullName);
  console.log("Renamed folders: ",fs.readdirSync('./'));
  var files = fs.readdirSync('./'+fullName);
  console.log("Files in "+fullName,files);
  for( var j = 0; j<files.length;j++ ) {
    var shortFileName = files[j];
    var fileNameArr = shortFileName.split('.');
    fileNameArr[0]=fullName;
    var fullFileName = fileNameArr.join('.');
    fs.renameSync('./'+fullName+'/'+shortFileName, './'+fullName+'/'+fullFileName);
  }
} */

function jsUcfirst(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

  var i =1;
  var commands = [];
  var obj = {'fst':'fieldSet', 'txa':'textArea'};
for( var short in maps ) {
  var full = maps[short];
  /* short = jsUcfirst(short);
  full = jsUcfirst(full); */
  //console.("Full Name", full);
  /* replace( short, full, 'Fe', 'Component' );
  replace( short, full, 'Lg', 'Component' ); */
  replace( short, full, '', '.component' );
  if (i == shorts.length) {
    //console.log("Going to run commands", commands);
    //nrc.run(commands);
    console.log(commands.join( "; " ));
  }
  i++;
}
function replace( oldName, NewName, prefix, suffix ) {
  oldName = prefix+oldName+suffix;
  NewName = prefix+NewName+suffix;
  runReplaceCommand( oldName, NewName );
}

function runReplaceCommand( str, replaceWithStr ) {
  var cmd = "find . -type f -name '*.ts' -print0 | xargs -0 sed -i -e 's/"+str+"/"+replaceWithStr+"/g'";
  commands.push(cmd);
  cmd = "find . -type f -name '*.ts' -print0 | xargs -0 sed -i -e 's/"+str+"/"+replaceWithStr+"/g'";
  commands.push(cmd);
}


