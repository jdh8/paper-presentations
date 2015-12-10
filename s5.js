"use strict";

(function()
{
	function KeyboardEventHandler(dict)
	{
		return function(event)
		{
			var f = dict[event.code];
			f && f();
		}
	}

	var slides = document.getElementsByClassName("slide");
	var active = 0;

	function play(index)
	{
		var length = slides.length;

		index %= length;

		if (index < 0)
			index += length;

		slides[active].classList.remove("active");
		slides[index].classList.add("active");
		active = index;
	}

	function prev() { play(active - 1) }
	function next() { play(active + 1) }

	slides[0].classList.add("active");

	addEventListener("keyup", KeyboardEventHandler({
		Backspace: prev,
		Enter: next,
		Space: next,
		PageUp: prev,
		PageDown: next,
		ArrowUp: prev,
		ArrowDown: next,
		ArrowLeft: prev,
		ArrowRight: next,
		Home: function() { play(0) },
		End: function() { play(-1) },
		KeyH: prev,
		KeyJ: next,
		KeyK: prev,
		KeyL: next,
	}));
})();
