(function($) {

    $.fn.formGenerator = function(options) {
        var formSettings = $.extend({
            // These are the defaults.
            saveFunctionName: 'saveData()',
            rows: [{
                el: 'h4',
                text: 'Form Example....!'
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
                el: 'h4',
                text: 'Datatable Example....!'
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
                            name: '<i class="fa fa-edit"></i>',
                            class: 'btn-warning',
                            onclickFunctionName: 'editRow(this)'
                        }, {
                            name: '<i class="fa fa-trash"></i>',
                            class: 'btn-danger',
                            onclickFunctionName: 'deleteRow(this)'
                        }]
                    }
                }]
            }, {
                el: 'hr'
            }, {
                el: 'h4',
                text: 'Editable Table Example....!'
            }, {
                tables: [{
                    type: 'editable',
                    class: 'wd-100p table-bordered mrg-t20px',
                    id: '',
                    addRow: true,
                    colsArr: ['Input', 'Select', 'Datepicker', 'Select2'],
                    rowControlArray: [{
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
                            name: '<i class="fa fa-trash"></i>',
                            class: 'btn-danger',
                            onclickFunctionName: 'deleteRow(this)'
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
                var divRow = $('<div class="row row' + (i + 1) + '"></div>');
                if (row.controls) {
                    $.each(row.controls, function(j, control) {
                        var formControl = null;

                        if (control.control && control.control == "input") {
                            formControl = $('<input type="' +
                                (control.type ? control.type : "text") + '" class="form-control ' +
                                control.class + '" ' + (control.id ? 'id="' + control.id + '"' : '') +
                                ' ' + (control.readonly ? 'readonly' : '') + ' ' +
                                (control.disabled ? 'disabled' : '') +
                                ' name="' + (control.name) + '"' +
                                ' placeholder="Enter ' + (control.label) + '" />');
                        }

                        if (control.control && control.control == "datepicker") {
                            formControl = $('<input type="text" class="form-control ' +
                                control.class + '" ' + (control.id ? 'id="' + control.id + '"' : '') + ' ' +
                                (control.readonly ? 'readonly' : '') + ' ' +
                                (control.disabled ? 'disabled' : '') +
                                ' name="' + (control.name) + '"' +
                                ' placeholder="Select ' + (control.label) + '" />');
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
                            formControl = $('<textarea class="form-control ' + control.class + '" ' +
                                (control.id ? 'id="' + control.id + '"' : '') + ' ' +
                                (control.readonly && control.readonly === true ? 'readonly' : '') + ' ' +
                                (control.disabled && control.disabled === true ? 'disabled' : '') + ' ' +
                                (control.rows ? 'rows=' + (control.rows) : 'rows="2"') + ' name="' + (control.name) + '" placeholder="Enter ' +
                                (control.label) + '"></textarea>');
                        }

                        if (control.control && (control.control == "select" || control.control == "select2")) {
                            if (control.data) {
                                $.each(control.data, function(k, d) {
                                    $(formControl).append('<option value="' + d.id + '">' + d.text + '</option>');
                                })
                            }
                        }

                        var fromGroupDiv = $('<div class="form-group"></div>');
                        var label = $('<label>' + (control.label ? control.label : '') + '</label>')
                        $(fromGroupDiv).append(label);
                        $(fromGroupDiv).append(formControl);

                        var colDiv = $('<div class="col col' + (j + 1) + '"></div>');
                        $(colDiv).append(fromGroupDiv);

                        if (control.control && control.control == "select2") {
                            $(formControl).select2({
                                width: '100%',
                                placeholder: 'Select ' + control.label,
                                allowClear: true
                            }).val(null).trigger('change');
                        }

                        if (control.control && control.control == "datepicker") {
                            $(formControl).datepicker({});
                        }

                        $(divRow).append(colDiv);

                        if (control.validation) {
                            $(fromGroupDiv).find('label').append('<span class="err"> *</span>');
                            formValidationRules[control.name] = control.validation.rules;
                            formValidationMessages[control.name] = control.validation.messages;
                        }

                    });
                }
                if (row.tables) {
                    $.each(row.tables, function(j, table) {
                        var tableDiv = null;
                        var tableEl = null;
                        tableDiv = $('<div class="col col' + (j + 1) + '"></div>');
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
                                    if (table.rowControlArray) {
                                        var control = table.rowControlArray[l];

                                        if (control && control.control && control.control.toLowerCase() == "input") {
                                            var ctrl = $('<input type="' +
                                                (control.type ? control.type : "text") + '" class="form-control ' +
                                                control.class + '" ' + (control.id ? 'id="' + control.id + '"' : '') +
                                                ' ' + (control.readonly ? 'readonly' : '') + ' ' +
                                                (control.disabled ? 'disabled' : '') +
                                                ' name="' + (control.name) + '"' +
                                                ' placeholder="Enter ' + (control.name) + '" />');
                                            $(ctrl).val(colD);
                                            $(tr).append('<td></td>');
                                            $(tr).find('td:last').append(ctrl);
                                        } else if (control && control.control && control.control.toLowerCase() == "datepicker") {
                                            var ctrl = $('<input type="text" class="form-control ' +
                                                control.class + '" ' + (control.id ? 'id="' + control.id + '"' : '') + ' ' +
                                                (control.readonly ? 'readonly' : '') + ' ' +
                                                (control.disabled ? 'disabled' : '') +
                                                ' name="' + (control.name) + '"' +
                                                ' placeholder="Select ' + (control.name) + '" />');
                                            $(ctrl).val(colD);
                                            $(ctrl).datepicker({});
                                            $(tr).append('<td></td>');
                                            $(tr).find('td:last').append(ctrl);
                                        } else if (control && control.control && control.control.toLowerCase() == "select") {
                                            var ctrl = $('<select class="form-control ' + control.class + '" ' +
                                                (control.id ? 'id="' + control.id + '"' : '') + ' ' +
                                                (control.readonly && control.readonly === true ? 'readonly' : '') + ' ' +
                                                (control.disabled && control.disabled === true ? 'disabled' : '') +
                                                ' name="' + (control.name) + ' "></select>');
                                            if (control.data) {
                                                $.each(control.data, function(m, dd) {
                                                    $(ctrl).append('<option value="' + dd.id + '">' + dd.text + '</option>');
                                                });
                                            }
                                            $(ctrl).val(colD).trigger('change');
                                            $(tr).append('<td></td>');
                                            $(tr).find('td:last').append(ctrl);
                                        } else if (control && control.control && control.control.toLowerCase() == "select2") {
                                            var ctrl = $('<select class="form-control select2-custom' + control.class + '" ' +
                                                (control.id ? 'id="' + control.id + '"' : '') + ' ' +
                                                (control.readonly && control.readonly === true ? 'readonly' : '') + ' ' +
                                                (control.disabled && control.disabled === true ? 'disabled' : '') +
                                                ' name="' + (control.name) + ' "></select>');
                                            if (control.data) {
                                                $.each(control.data, function(m, dd) {
                                                    $(ctrl).append('<option value="' + dd.id + '">' + dd.text + '</option>');
                                                });
                                            }
                                            $(tr).append('<td></td>');
                                            $(tr).find('td:last').append(ctrl);
                                            $(ctrl).select2({
                                                width: '100%',
                                                placeholder: 'Select ' + control.name,
                                                allowClear: true
                                            }).val(colD).trigger('change');
                                        } else if (control && control.control && control.control.toLowerCase() == "textarea") {
                                            var ctrl = $('<textarea class="form-control ' + control.class + '" ' +
                                                (control.id ? 'id="' + control.id + '"' : '') + ' ' +
                                                (control.readonly && control.readonly === true ? 'readonly' : '') + ' ' +
                                                (control.disabled && control.disabled === true ? 'disabled' : '') + ' ' +
                                                (control.rows ? 'rows=' + (control.rows) : 'rows="2"') + ' name="' + (control.name) + '" placeholder="Enter ' +
                                                (control.label) + '"></textarea>');

                                            $(ctrl).val(colD);
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
                                                $(actionTd).append('<button type="button" class="btn ' + (bu.class) + '" onclick="' + (bu.onclickFunctionName ? bu.onclickFunctionName : '') + '">' + (bu.name) + '</button>');
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
                                                $(actionTd).append('<button type="button" class="btn ' + (bu.class) + '" onclick="' + (bu.onclickFunctionName ? bu.onclickFunctionName : '') + '">' + (bu.name) + '</button>');
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
                            var addRowBtn = $('<button type="button" class="btn btn-info addRowBtn"><i class="fa fa-plus"></i> Add Row</button>')
                            $(tableDiv).prepend('<div class="float-right m-tb10px addRowBtnDiv"></div>');
                            $(tableDiv).find('.addRowBtnDiv').append(addRowBtn);
                            $(addRowBtn).on('click', function() {
                                console.log('saveBtn click');
                                addRowToTable(table, tableEl);
                            });
                        }
                        $(divRow).append(tableDiv);
                    });
                }
                if (row.el) {
                    var colDiv = $('<div class="col"></div>');
                    var el = $('<' + row.el + '>' + (row.text ? row.text : '') + '</' + row.el + '>');
                    $(colDiv).append(el);
                    $(divRow).append(colDiv);
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
        var cardButtons = $('<div class="float-right"><button class="btn btn-primary saveBtn" type="button">Save Form</button> <button class="btn btn-default" type="button">Clear Form</button></div>');
        var card = $('<div class="card"><div class="card-header"></div><div class="card-body"></div><div class="card-footer"></div></div>');
        $(card).find('.card-header').append(formSettings.title ? formSettings.title : 'Form');
        $(card).find('.card-header').append(cardButtons);
        $(card).find('.card-body').append(form);
        $(card).find('.card-footer').append(cardButtons);

        $(cardButtons).find('button.saveBtn').on('click', function() {
            console.log('saveBtn click');
            onSaveForm();
        });

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
            if (table.rowControlArray) {
                var tr = $('<tr><td class="txt-c">' + ($(tableEl).find('tbody tr').length + 1) + '</td></tr>');
                $.each(table.rowControlArray, function(i, control) {
                    if (control && control.control && control.control.toLowerCase() == "input") {
                        var ctrl = $('<input type="' +
                            (control.type ? control.type : "text") + '" class="form-control ' +
                            control.class + '" ' + (control.id ? 'id="' + control.id + '"' : '') +
                            ' ' + (control.readonly ? 'readonly' : '') + ' ' +
                            (control.disabled ? 'disabled' : '') +
                            ' name="' + (control.name) + '"' +
                            ' placeholder="Enter ' + (control.name) + '" />');
                        $(tr).append('<td></td>');
                        $(tr).find('td:last').append(ctrl);
                    } else if (control && control.control && control.control.toLowerCase() == "datepicker") {
                        var ctrl = $('<input type="text" class="form-control ' +
                            control.class + '" ' + (control.id ? 'id="' + control.id + '"' : '') + ' ' +
                            (control.readonly ? 'readonly' : '') + ' ' +
                            (control.disabled ? 'disabled' : '') +
                            ' name="' + (control.name) + '"' +
                            ' placeholder="Select ' + (control.name) + '" />');
                        $(tr).append('<td></td>');
                        $(tr).find('td:last').append(ctrl);
                        $(ctrl).datepicker({});
                    } else if (control && control.control && control.control.toLowerCase() == "select") {
                        var ctrl = $('<select class="form-control ' + control.class + '" ' +
                            (control.id ? 'id="' + control.id + '"' : '') + ' ' +
                            (control.readonly && control.readonly === true ? 'readonly' : '') + ' ' +
                            (control.disabled && control.disabled === true ? 'disabled' : '') +
                            ' name="' + (control.name) + ' "></select>');
                        if (control.data) {
                            $.each(control.data, function(m, dd) {
                                $(ctrl).append('<option value="' + dd.id + '">' + dd.text + '</option>');
                            });
                        }
                        $(tr).append('<td></td>');
                        $(tr).find('td:last').append(ctrl);
                    } else if (control && control.control && control.control.toLowerCase() == "select2") {
                        var ctrl = $('<select class="form-control select2-custom' + control.class + '" ' +
                            (control.id ? 'id="' + control.id + '"' : '') + ' ' +
                            (control.readonly && control.readonly === true ? 'readonly' : '') + ' ' +
                            (control.disabled && control.disabled === true ? 'disabled' : '') +
                            ' name="' + (control.name) + ' "></select>');
                        if (control.data) {
                            $.each(control.data, function(m, dd) {
                                $(ctrl).append('<option value="' + dd.id + '">' + dd.text + '</option>');
                            });
                        }
                        $(tr).append('<td></td>');
                        $(tr).find('td:last').append(ctrl);
                        $(ctrl).select2({
                            width: '100%',
                            placeholder: 'Select ' + control.name,
                            allowClear: true
                        }).val(null).trigger('change');
                    } else if (control && control.control && control.control.toLowerCase() == "textarea") {
                        var ctrl = $('<textarea class="form-control ' + control.class + '" ' +
                            (control.id ? 'id="' + control.id + '"' : '') + ' ' +
                            (control.readonly && control.readonly === true ? 'readonly' : '') + ' ' +
                            (control.disabled && control.disabled === true ? 'disabled' : '') + ' ' +
                            (control.rows ? 'rows=' + (control.rows) : 'rows="2"') + ' name="' + (control.name) + '" placeholder="Enter ' +
                            (control.label) + '"></textarea>');

                        $(tr).append('<td></td>');
                        $(tr).find('td:last').append(ctrl);
                    } else {
                        $(tr).append('<td></td>');
                    }
                });
                if (table.rowAction) {
                    if (table.rowAction.colIndex) {
                        var afterIndex = table.rowAction.colIndex - 1;
                        var actionTd = $('<td class="txt-c"></td>');
                        if (table.rowAction.buttons) {
                            $.each(table.rowAction.buttons, function(l, bu) {
                                $(actionTd).append('<button type="button" class="btn ' + (bu.class) + '" onclick="' + (bu.onclickFunctionName ? bu.onclickFunctionName : '') + '">' + (bu.name) + '</button>');
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
    }

}(jQuery));