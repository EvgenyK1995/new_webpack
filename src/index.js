import './index.styl';

let i = 1;
console.log(`${i+14}`);
const localObj = {
  k: true,
  c: false,
  i: 'hi'
}

const t = false;

if (t) {
  console.log('hihihihi!');
} else {
  console.log(localObj);
}