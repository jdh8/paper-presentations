"use strict";

(function()
{
	var slides = document.getElementsByClassName("slide");
	var active = 0;
	var play;

	function switchTo(index)
	{
		var length = slides.length;

		index %= length;

		if (index < 0)
			index += length;

		slides[active].classList.remove("active");
		slides[index].classList.add("active");
		active = index;
	}

	function noop() {}
	function prev() { play(active - 1) }
	function next() { play(active + 1) }

	function toggle()
	{
		play = document.body.classList.toggle("playing") ? switchTo : noop;
	}

	slides[0].classList.add("active");
	toggle();

	addEventListener("keyup", function(event)
	{
		({
			Escape: toggle,
			PageUp: prev,
			PageDown: next,
			ArrowUp: prev,
			ArrowDown: next,
			ArrowLeft: prev,
			ArrowRight: next,
			Home: function() { play(0) },
			End: function() { play(-1) },
		}[event.code] || noop)();
	});

	addEventListener("wheel", function(event)
	{
		if (event.deltaMode)
			(event.deltaX + event.deltaY < 0 ? prev : next)();
	});
})();
