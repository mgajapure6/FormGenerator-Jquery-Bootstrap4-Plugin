# Form Generator Jquery Bootstrap 4 Plugin
#### How to make form #
pass the option object with following key value pairs
```html code :
```<div class="container mrg-t20px mrg-b20px">
``` <div id="form"></div>
```</div>
```Javascript code : 
$('#form').formGenerator({
  rows:[
    {
      el: 'h4',
      text: 'Form Example....!'
    },
    controls: [
      {
        label: "Number Field",
        control: "input",
        type: "text",
        name: "inputNumber",
        class: "",
        validation: {
            rules: {
                required: true,
                number: true,
                minlength: 5,
                maxlength: 10
            },
            messages: {
                required: "Required input",
                number: "Only decimal number allowed",
                minlength: "Please, enter at least 5 number",
                maxlength: "Can not be exceed more than 10 numbers",
            }
        }
      }  
    ]
  ]
});
```
