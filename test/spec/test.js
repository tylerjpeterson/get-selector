'use strict';

const _ = require('lodash');
const test = require('tape');
const getSelector = require('./../..');

document.body.innerHTML = '<div style="display: none;"><ul><li></li><li></li><li><a href="linkOne" class="linkOne"></a><a href="linkTwo" class="linkTwo"></a><a href="linkThree" class="linkThree"></a></li></ul><ul><li class="itemOne first"><a href="linkOne" class="linkOne"></a><a href="linkTwo" class="linkTwo"></a><a href="linkThree" class="linkThree"></a></li><li class="itemTwo" id="list-item-two"><a href="linkOne" class="list-item-two-link-one"></a><a href="linkTwo"></a><a href="linkThree"></a><a></a><a href="linkOne" class="classOne classTwo classThree"></a><a href="linkTwo" target="someTarget2" rel="someRel" class="classOne classTwo classThree"></a><a href="linkThree" target="someTarget" rel="someRel" class="classOne classTwo classThree" id="linkZero"></a></li><li class="itemThree last"><a href="linkOne" id="linkOne" class="classOne classTwo classThree"></a><a href="linkTwo" id="linkTwo"></a><a href="linkThree" id="linkThree"></a></li></ul></div>';

test('Should be a function', assert => {
	assert.equal(typeof getSelector, 'function', 'Module exported a function.');
	assert.end();
});

test('Should return a unique CSS selector', assert => {
	var element = document.querySelector('li.last');
	assert.equal(getSelector(element), 'html > body > div:nth-child(1) > ul:nth-child(2) > li:nth-child(3)', 'Module returned appropriate selector.');
	assert.end();
});

test('Should return false when passed an invalid element', assert => {
	var element = document.querySelector('#i-do-not-exist');
	assert.equal(getSelector(element), false, 'Module returned false for invalid element.');
	assert.end();
});

test('Should build selector from the closest descendant with an id', assert => {
	var element = document.querySelector('.list-item-two-link-one');
	assert.equal(getSelector(element), '#list-item-two > a:nth-child(1)', 'Module returned appropriate selector.');
	assert.end();
});

test('Should build selector from document Element if no ancestors have an id', assert => {
	var element = document.querySelector('.linkThree');
	assert.equal(getSelector(element), 'html > body > div:nth-child(1) > ul:nth-child(1) > li:nth-child(3) > a:nth-child(3)', 'Module returned appropriate selector.');
	assert.end();
});

test('Should build a unique selector for any DOM element', assert => {
	var all = document.querySelectorAll('*');
	var res = [];
	var i = null;

	for (i = 0; i < all.length; i++) {
		res.push(getSelector(all[i]));
	}

	assert.equal(res.length, _.uniq(res).length, 'Module returned unique selectors for all page elements.');
	assert.end();
});

test('Should build selector from ancestor with mixed-type siblings', assert => {
	document.body.innerHTML = '<div><h2>header</h2><div><span class="t"></span></div></div>';

	var element = document.querySelector('span');
	assert.equal(getSelector(element), 'html > body > div:nth-child(1) > div:nth-child(2) > span:nth-child(1)', 'Module returned appropriate selector.');

	document.body.innerHTML = '<div><div><span><span class="t"></span></span><em></em></div></div>';

	element = document.querySelector('.t');
	assert.equal(getSelector(element), 'html > body > div:nth-child(1) > div:nth-child(1) > span:nth-child(1) > span:nth-child(1)', 'Module returned appropriate selector.');

	assert.end();
});

window.close();
