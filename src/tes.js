let b = 'hello';
b += ' Molli';

console.log(b);

let t = 1;

if (t) {
  setTimeout(() => {
    import('./components/popup').then(popup => {popup.default();}).catch((r) => console.log(r));
  }, 10500)
}