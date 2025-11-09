const { test, expect } = require('@playwright/test');
test('Count number of a characters in a string', async ({}) => {
    const str = 'Bharadwaja';
    let count = 0;
    const noofChar = await getNoofChar(str, count);
    console.log(`The number of 'a' characters in the string "${str}" is: ${noofChar}`);
});

async function getNoofChar(str, count){
for(let i=0;i<str.length;i){
    if(str[i] === 'a'){
    count++
    }
}return count;
}    
