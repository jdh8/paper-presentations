"use strict";

(function()
{
	function Nothing() {}

	function Maybe(x)
	{
		return x == null ? Nothing : x;
	}

	var slides = document.getElementsByClassName("slide");
	var active = 0;
	var keys = [];

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

	function prev() { switchTo(active - 1) }
	function next() { switchTo(active + 1) }

	function toggle()
	{
		document.body.classList.toggle("playing");
	}

	slides[0].classList.add("active");
	toggle();

	addEventListener("keypress", function(event)
	{
		Maybe({
			Escape: toggle,
			PageUp: prev,
			PageDown: next,
			ArrowUp: prev,
			ArrowDown: next,
			ArrowLeft: prev,
			ArrowRight: next,
			Home: function() { switchTo(0) },
			End: function() { switchTo(-1) },
		}[event.code])();

		console.log(event.code);
	});

	addEventListener("click", function(event)
	{
		[Nothing, Nothing, Nothing, prev, next][event.button]();
	});

	document.getElementById("prev").addEventListener("click", prev);
	document.getElementById("next").addEventListener("click", next);
	document.getElementById("toggle").addEventListener("click", toggle);
})();
