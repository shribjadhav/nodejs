
const fs = require('fs')

const filename = 'list.txt'
const types = [ 'object', 'array', 'string', 'integer', 'float', 'boolean' ]

for (const type of types) 
{  
  //console.log(`A JavaScript type is: ${type}`)
  fs.appendFile(`${filename}`,`${type}`+'\n','utf8', (err) => {
    if (err) 
    {
        throw err;
    }
    else
    {
        console.log(`${type} added into the file`);
    }
  });
}


