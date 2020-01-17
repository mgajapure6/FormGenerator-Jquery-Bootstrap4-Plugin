(function($) {

    $.fn.formGenerator = function(options) {
        var formSettings = $.extend({
            // These are the defaults.
            saveFunctionName: 'saveData()',
            rows: [{
                el: {
                    tag: 'h4',
                    html: 'Form Example....!'
                }
            }, {
                controls: [{
                    label: "Input 1",
                    control: "input",
                    type: "text",
                    name: "input1",
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
                }, {
                    label: "Input 2",
                    control: "datepicker",
                    type: "text",
                    name: "input2",
                    class: "",
                    validation: {
                        rules: {
                            required: true,
                            minlength: 10,
                            maxlength: 10,
                        },
                        messages: {
                            required: "Required input",
                            minlength: "Please, enter correct date",
                            maxlength: "Can not be exceed more than 10 characters"
                        }
                    }
                }, {
                    label: "Date picker",
                    control: "datepicker",
                    class: "",
                    value: "",
                    name: "datepicker1",
                }],
            }, {
                controls: [{
                    label: "textarea 1",
                    control: "textarea",
                    class: "",
                    name: "textarea1",
                    rows: 1
                }, {
                    label: "Select 1",
                    control: "select",
                    class: "",
                    name: "select1",
                    data: [{
                        id: 1,
                        text: "Option 1"
                    }, {
                        id: 2,
                        text: "Option 2"
                    }]
                }, {
                    label: "Select2",
                    control: "select2",
                    class: "",
                    name: "select2",
                    data: [{
                        id: 1,
                        text: "Option 1"
                    }, {
                        id: 2,
                        text: "Option 2"
                    }]
                }]
            }, {
                el: 'hr'
            }, {
                el: {
                    tag: 'h4',
                    html: 'Datatable Example....!'
                },
            }, {
                tables: [{
                    type: 'datatable',
                    class: 'wd-100p table-bordered',
                    id: '',
                    colsArr: ['Name'],
                    dataArr: [
                        ['Name 1'],
                        ['Name 2'],
                        ['Name 3'],
                        ['Name 4']
                    ],
                    rowAction: {
                        colIndex: 2,
                        buttons: [{
                            text: '',
                            icon_class: 'fa-edit',
                            class: 'btn-warning',
                            fnName: 'editRow(this)'
                        }, {
                            text: '',
                            icon_class: 'fa-trash',
                            class: 'btn-danger',
                            fnName: 'deleteRow(this)'
                        }]
                    }
                }]
            }, {
                el: 'hr'
            }, {
                el: {
                    tag: 'h4',
                    text: 'Editable Table Example....!'
                }
            }, {
                tables: [{
                    type: 'editable',
                    class: 'wd-100p table-bordered mrg-t20px',
                    id: '',
                    addRow: true,
                    colsArr: ['Input', 'Select', 'Datepicker', 'Select2'],
                    controls: [{
                        control: "input",
                        type: "text",
                        name: "tdInput1",
                        class: "",
                    }, {
                        control: "select",
                        name: "tdSelect1",
                        class: "",
                        data: [{
                            id: 1,
                            text: "Active"
                        }, {
                            id: 2,
                            text: "Inactive"
                        }]
                    }, {
                        control: "datepicker",
                        name: "tdDatepicker1",
                        class: ""
                    }, {
                        control: "select2",
                        name: "tdSelect21",
                        class: "",
                        data: [{
                            id: 1,
                            text: "Active"
                        }, {
                            id: 2,
                            text: "Inactive"
                        }]
                    }],
                    dataArr: [
                        ['Name 1', 1, '16-01-2020', 1],
                        ['Name 2', 2, '16-01-2020', 2],
                        ['Name 3', 1, '16-01-2020', 1],
                        ['Name 4', 2, '16-01-2020', 2]
                    ],
                    rowAction: {
                        colIndex: 5,
                        buttons: [{
                            text: '',
                            icon_class: 'fa-trash',
                            class: 'btn-danger',
                            fnName: 'deleteRow(this)'
                        }]
                    }
                }]
            }]
        }, options);

        var form = $('<form></form>');
        var formValidationRules = {};
        var formValidationMessages = {};

        if (formSettings.rows) {
            $.each(formSettings.rows, function(i, row) {
                var divRow = generateRowDiv();
                if (row.control) {
                    var fromGroupDiv = generateControl(row.control, true);
                    var colDiv = generateColDiv();
                    $(colDiv).append(fromGroupDiv);
                    $(divRow).append(colDiv);
                }
                if (row.controls) {
                    $.each(row.controls, function(j, control) {
                        var fromGroupDiv = generateControl(control, true);
                        var colDiv = generateColDiv();
                        $(colDiv).append(fromGroupDiv);
                        $(divRow).append(colDiv);
                    });
                }
                if (row.table) {
                    var tableDiv = generateTable(row.table);
                    $(divRow).append(tableDiv);
                }
                if (row.tables) {
                    $.each(row.tables, function(j, table) {
                        var tableDiv = generateTable(table);
                        $(divRow).append(tableDiv);
                    });
                }
                if (row.el) {
                    var elDiv = generateEl(row.el);
                    $(divRow).append(elDiv);
                }
                if (row.els) {
                    $.each(row.els, function(j, el) {
                        var elDiv = generateEl(el);
                        $(divRow).append(elDiv);
                    });
                }
                if (row.button) {
                    var button = generateButton(row.button);
                    $(divRow).append(button);
                }
                if (row.buttons) {
                    $.each(row.buttons, function(j, btn) {
                        var btn = generateButton(btn);
                        $(divRow).append(btn);
                    });
                }
                if (row.wizard) {
                    var wizardContent = $('<div class="wizard-content"></div>');
                    var wizardDiv = $('<div class="col wizard mrg-t20px tab-wizard wizard-circle wizard clearfix"></div>');
                    if (row.wizard.steps) {
                        $.each(row.wizard.steps, function(j, step) {
                            $(wizardDiv).append('<h6 class="title">' + step.title + '</h6>');
                            var stepDiv = generateStep(step);
                            $(wizardDiv).append(stepDiv);
                        });
                    }
                    $(wizardContent).append(wizardDiv);
                    $(divRow).append(wizardContent);
                    $(wizardDiv).steps(row.wizard.config);
                }
                $(form).append(divRow);
            });
        }

        console.log('formValidationRules', formValidationRules)

        $(form).validate({
            rules: formValidationRules,
            messages: formValidationMessages
        });
        //console.log('form', form);
        var card = $('<div class="card"><div class="card-header"></div><div class="card-body"></div><div class="card-footer"></div></div>');
        //var cardButtons = $('<div class="float-right"><button class="btn btn-primary saveBtn" type="button">Save Form</button> <button class="btn btn-default" type="button">Clear Form</button></div>');
        $(card).find('.card-header').append(formSettings.title ? formSettings.title : 'Form');
        //$(card).find('.card-header').append(cardButtons);
        $(card).find('.card-body').append(form);
        //$(card).find('.card-footer').append(cardButtons);

        // $(cardButtons).find('button.saveBtn').on('click', function () {
        //     console.log('saveBtn click');
        //     onSaveForm();
        // });

        $(this).append(card);

        return this;

        function onSaveForm() {
            console.log('onSaveForm called');
            if ($(form).valid()) {
                alert("form is valid");
            } else {

            }
        }

        function addRowToTable(table, tableEl) {
            if (table.controls) {
                var tr = $('<tr><td class="txt-c">' + ($(tableEl).find('tbody tr').length + 1) + '</td></tr>');
                $.each(table.controls, function(i, control) {
                    var ctrl = generateControl(control, false);
                    $(tr).append('<td></td>');
                    $(tr).find('td:last').append(ctrl);
                });
                if (table.rowAction) {
                    if (table.rowAction.colIndex) {
                        var afterIndex = table.rowAction.colIndex - 1;
                        var actionTd = $('<td class="txt-c"></td>');
                        if (table.rowAction.buttons) {
                            $.each(table.rowAction.buttons, function(l, bu) {
                                $(actionTd).append(generateButton(bu));
                            });
                            $(tr).find('td:eq(' + afterIndex + ')').after(actionTd);
                        } else {
                            $(tr).find('td:eq(' + afterIndex + ')').after(actionTd);
                        }
                    } else {
                        $(tr).append('<td class="txt-c"></td>');
                    }
                }
                $(tr).find('td:last').append('<span class="hide row-obj"></span>');
                $(tableEl).find('tbody').append(tr);
            }
        }

        function deleteRowFromTable(table, tableEl, trEl) {
            $(trEl).remove();
            $(tableEl).find('tbody tr').each(function(i, tr) {
                $(tr).find('td:eq(0)').text(i + 1);
            });
        }

        function generateEl(el) {
            var colDiv = generateColDiv();
            var ele = null;
            if (typeof el === 'string') {
                ele = $('<' + el + '>');
            } else {
                ele = $('<' + el.tag + ' class="' + (el.class ? el.class : '') + '" id="' + (el.id ? el.id : '') + '">' + (el.html ? el.html : '') + '</' + el.tag + '>');
            }
            $(colDiv).append(ele);
            return colDiv;
        }

        function generateControl(control, isFormGroup) {
            var formControl = null;
            if (control.control && control.control == "input") {
                formControl = $('<input value="' + (control.value ? control.value : '') + '" type="' +
                    (control.type ? control.type : "text") + '" class="form-control ' +
                    control.class + '" ' + (control.id ? 'id="' + control.id + '"' : '') +
                    ' ' + (control.readonly ? 'readonly' : '') + ' ' +
                    (control.disabled ? 'disabled' : '') +
                    ' name="' + (control.name) + '"' +
                    ' placeholder="' + (control.placeholder ? control.placeholder : '') + '" />');
            }

            if (control.control && control.control == "datepicker") {
                formControl = $('<input value="' + (control.value ? control.value : '') + '" type="text" class="form-control ' +
                    control.class + '" ' + (control.id ? 'id="' + control.id + '"' : '') + ' ' +
                    (control.readonly ? 'readonly' : '') + ' ' +
                    (control.disabled ? 'disabled' : '') +
                    ' name="' + (control.name) + '"' +
                    ' placeholder="' + (control.placeholder ? control.placeholder : '') + '" />');
            }

            if (control.control && control.control == "select") {
                formControl = $('<select class="form-control ' + control.class + '" ' +
                    (control.id ? 'id="' + control.id + '"' : '') + ' ' +
                    (control.readonly && control.readonly === true ? 'readonly' : '') + ' ' +
                    (control.disabled && control.disabled === true ? 'disabled' : '') + ' name="' + (control.name) + ' "></select>');
            }

            if (control.control && control.control == "select2") {
                formControl = $('<select class="form-control select2-custom' + control.class + '" ' +
                    (control.id ? 'id="' + control.id + '"' : '') + ' ' +
                    (control.readonly && control.readonly === true ? 'readonly' : '') + ' ' +
                    (control.disabled && control.disabled === true ? 'disabled' : '') + ' name="' + (control.name) + ' "></select>');
            }

            if (control.control && control.control == "textarea") {
                formControl = $('<textarea value="' + (control.value ? control.value : '') + '" class="form-control ' + control.class + '" ' +
                    (control.id ? 'id="' + control.id + '"' : '') + ' ' +
                    (control.readonly && control.readonly === true ? 'readonly' : '') + ' ' +
                    (control.disabled && control.disabled === true ? 'disabled' : '') + ' ' +
                    (control.rows ? 'rows=' + (control.rows) : 'rows="2"') + ' name="' + (control.name) + '" placeholder="' +
                    (control.placeholder ? control.placeholder : '') + '"></textarea>');
            }

            if (control.control && (control.control == "select" || control.control == "select2")) {
                if (control.data) {
                    $.each(control.data, function(k, d) {
                        $(formControl).append('<option value="' + d.id + '">' + d.text + '</option>');
                    })
                }
            }

            var fromGroupDiv = $('<div></div>');
            if (isFormGroup) {
                $(fromGroupDiv).addClass('form-group');
                var label = $('<label>' + (control.label ? control.label : '') + '</label>')
                $(fromGroupDiv).append(label);
            }

            $(fromGroupDiv).append(formControl);

            if (control.control && control.control == "select2") {
                $(formControl).select2({
                    width: '100%',
                    placeholder: control.placeholder ? control.placeholder : '',
                    allowClear: true
                }).val(control.value ? control.value : null).trigger('change');
            }

            if (control.control && control.control == "select") {
                $(formControl).val(control.value ? control.value : null).trigger('change');
            }

            if (control.control && control.control == "datepicker") {
                $(formControl).datepicker({});
            }

            if (control.validation) {
                $(fromGroupDiv).find('label').append('<span class="err"> *</span>');
                formValidationRules[control.name] = control.validation.rules;
                formValidationMessages[control.name] = control.validation.messages;
            }

            return fromGroupDiv;
        }

        function generateTable(table) {
            var tableDiv = null;
            var tableEl = null;
            tableDiv = generateColDiv();
            tableEl = $('<table class="table"></table>');
            $(tableEl).attr('class', table.class ? table.class : '');
            $(tableEl).attr('id', table.id ? table.id : '');
            $(tableEl).append('<thead></thead>');
            $(tableEl).append('<tbody></tbody>');
            var theadTr = $('<tr><th class="txt-c">SN</th></tr>');
            $.each(table.colsArr, function(k, colD) {
                $(theadTr).append('<th>' + colD + '</th>');
            });
            if (table.rowAction) {
                if (table.rowAction.colIndex) {
                    var afterIndex = table.rowAction.colIndex - 1;
                    $(theadTr).find('th:eq(' + afterIndex + ')').after('<th class="txt-c">Action</th>');
                } else {
                    $(theadTr).append('<th class="txt-c">Action</th>');
                }
            }
            $(tableEl).find('thead').append(theadTr);

            if (table.type && table.type == "editable") {
                $.each(table.dataArr, function(k, d) {
                    var tr = $('<tr><td class="txt-c">' + (k + 1) + '</td></tr>');
                    $.each(d, function(l, colD) {
                        if (table.controls) {
                            var control = table.controls[l];
                            if (control) {
                                control.value = colD;
                                var ctrl = generateControl(control, false);
                                $(tr).append('<td></td>');
                                $(tr).find('td:last').append(ctrl);
                            } else {
                                $(tr).append('<td>' + colD + '</td>');
                            }
                        }
                    });

                    if (table.rowAction) {
                        if (table.rowAction.colIndex) {
                            var afterIndex = table.rowAction.colIndex - 1;
                            var actionTd = $('<td class="txt-c"></td>');
                            if (table.rowAction.buttons) {
                                $.each(table.rowAction.buttons, function(l, bu) {
                                    $(actionTd).append(generateButton(bu));
                                });
                                $(tr).find('td:eq(' + afterIndex + ')').after(actionTd);
                            } else {
                                $(tr).find('td:eq(' + afterIndex + ')').after(actionTd);
                            }
                        } else {
                            $(tr).append('<td class="txt-c"></td>');
                        }
                    }
                    $(tr).find('td:last').append('<span class="hide row-obj">' + JSON.stringify(d) + '</span>')
                    $(tableEl).find('tbody').append(tr);
                });
            } else if (table.type && table.type == "datatable") {

            } else {
                $.each(table.dataArr, function(k, d) {
                    var tr = $('<tr><td class="txt-c">' + (k + 1) + '</td></tr>');
                    $.each(d, function(k, colD) {
                        $(tr).append('<td>' + colD + '</td>');
                    });

                    if (table.rowAction) {
                        if (table.rowAction.colIndex) {
                            var afterIndex = table.rowAction.colIndex - 1;
                            var actionTd = $('<td class="txt-c"></td>');
                            if (table.rowAction.buttons) {
                                $.each(table.rowAction.buttons, function(l, bu) {
                                    $(actionTd).append(generateButton(bu));
                                });
                                $(tr).find('td:eq(' + afterIndex + ')').after(actionTd);
                            } else {
                                $(tr).find('td:eq(' + afterIndex + ')').after(actionTd);
                            }
                        } else {
                            $(tr).append('<td class="txt-c"></td>');
                        }
                    }
                    $(tr).find('td:last').append('<span class="hide row-obj">' + JSON.stringify(d) + '</span>');
                    $(tableEl).find('tbody').append(tr);
                });
            }



            $(tableDiv).append(tableEl);
            if (table.type && table.type == "datatable") {
                $(tableEl).DataTable({
                    data: table.dataArr
                });
            }

            if (table.type && table.type == "editable" && table.addRow && table.addRow == true) {
                var addRowBtn = generateButton({
                    fnName: "",
                    text: "Add Row",
                    class: "btn-info addRowBtn",
                    icon_class: "fa-plus"
                });
                $(tableDiv).prepend('<div class="float-right m-tb10px addRowBtnDiv"></div>');
                $(tableDiv).find('.addRowBtnDiv').append(addRowBtn);
                $(addRowBtn).on('click', function() {
                    console.log('saveBtn click');
                    addRowToTable(table, tableEl);
                });
            }

            return tableDiv;
        }

        function generateRowDiv() {
            return $('<div class="row"></div>');
        }

        function generateColDiv() {
            return $('<div class="col col-sm-12"></div>');
        }

        function generateButton(button) {
            return $('<button type="button" id="' + (button.id ? button.id : '') + '" onclick="' + (button.fnName ? button.fnName : '') + '" class="btn ' + (button.class ? button.class : '') + '"><i class="fa ' + (button.icon_class ? button.icon_class : '') + '"></i> ' + (button.text ? button.text : '') + '</button>');
        }

        function generateStep(step) {
            var stepDiv = $('<section class=""></section>');
            var h3 = $('<h4>' + (step.sub_title ? step.sub_title : 'Step') + '</h4><hr>');
            $(stepDiv).append(h3);
            if (step.rows) {
                $.each(step.rows, function(z, row) {
                    var divRow = generateRowDiv();
                    if (row.control) {
                        var fromGroupDiv = generateControl(row.control, true);
                        var colDiv = generateColDiv();
                        $(colDiv).append(fromGroupDiv);
                        $(divRow).append(colDiv);
                    }
                    if (row.controls) {
                        $.each(row.controls, function(j, control) {
                            var fromGroupDiv = generateControl(control, true);
                            var colDiv = generateColDiv();
                            $(colDiv).append(fromGroupDiv);
                            $(divRow).append(colDiv);
                        });
                    }
                    if (row.table) {
                        var tableDiv = generateTable(row.table);
                        var colDiv = generateColDiv();
                        $(colDiv).append(tableDiv);
                        $(divRow).append(colDiv);
                    }
                    if (row.tables) {
                        $.each(row.tables, function(j, table) {
                            var tableDiv = generateTable(table);
                            var colDiv = generateColDiv();
                            $(colDiv).append(tableDiv);
                            $(divRow).append(colDiv);
                        });
                    }
                    if (row.el) {
                        var elDiv = generateEl(row.el);
                        $(divRow).append(elDiv);
                    }
                    if (row.els) {
                        $.each(row.els, function(j, el) {
                            var elDiv = generateEl(el);
                            $(divRow).append(elDiv);
                        });
                    }
                    if (row.button) {
                        var button = generateButton(row.button);
                        $(divRow).append(button);
                    }
                    if (row.buttons) {
                        $.each(row.buttons, function(j, btn) {
                            var btn = generateButton(btn);
                            $(divRow).append(btn);
                        });
                    }
                    $(stepDiv).append(divRow);
                });
            }
            console.log('step', JSON.stringify(stepDiv));
            return stepDiv;
        }

        function generateRowElements(row) {
            var rowEle = null;
        }
    }

}(jQuery));
