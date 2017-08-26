'use strict';

const getSelector = require('./../../../');

// unique
var element1 = document.querySelector('.demo li.last');
var output1 = document.querySelector('.output-1');
output1.textContent = getSelector(element1);

// invalid element
var element2 = document.querySelector('#i-do-not-exist');
var output2 = document.querySelector('.output-2');
output2.textContent = getSelector(element2);

// closest descendant with an ID attribute
var element3 = document.querySelector('.demo .list-item-two-link-one');
var output3 = document.querySelector('.output-3');
output3.textContent = getSelector(element3);

// build selector from document Element if no ancestors have an id
var element4 = document.querySelector('.demo .linkThree');
var output4 = document.querySelector('.output-4');
output4.textContent = getSelector(element4);

// build a unique selector for any DOM element
var output5 = document.querySelector('.output-5');
var all = document.querySelectorAll('.demo *');
var res = [];
var i = null;

for (i = 0; i < all.length; i++) {
	res.push(getSelector(all[i]));
}

output5.innerHTML = res.join('<br>');
