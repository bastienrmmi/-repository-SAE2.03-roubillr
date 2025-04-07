// let templateFile = await fetch("./component/MovieForm/template.html");
// let templateFile2 = await fetch("./component/MovieForm/template-options.html");
// let template = await templateFile.text();
// let template2 = await templateFile.text();

// let MovieForm = {};

// MovieForm.format = function (movies) {
//   let html = "";
//   for(let m of obj.menus){
//     let li = templateLi;
//     li = li.replace("{{text}}",m.text); 
//     items = items + li;
//   }
//   movies.forEach((film) =>  {
//     let htmlfilm = template;
//     htmlfilm = htmlfilm.replace("{{title}}", film.name);
//     htmlfilm = htmlfilm.replace("{{image}}", film.image);
//     html += htmlfilm;
//   });
//   return html;
// };

// export { MovieForm };


let templateFile = await fetch("./component/MovieForm/template.html");
let template = await templateFile.text();

let MovieForm = {};

MovieForm.format = function (handler) {
  let html = template;
  html = html.replace("{{handler}}", handler);
  return html;
};

export { MovieForm };
