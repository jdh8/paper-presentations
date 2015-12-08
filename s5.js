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
		var isAnchor = function()
		{
			for (var node = event.target; node; node = node.parentElement)
				if (node instanceof HTMLAnchorElement)
					return true;
			return false;
		}();

		var isInteractive = isAnchor || [
			HTMLEmbedElement,
			HTMLObjectElement,
			HTMLMediaElement,
			SVGSVGElement,
			HTMLCanvasElement,
			HTMLInputElement,
			HTMLTextAreaElement,
			HTMLSelectElement,
			HTMLOptionElement,
		].some(function(constructor)
		{
			return event.target instanceof constructor;
		});

		var handler = isInteractive ? Nothing : event.shiftKey ? prev : next;

		[handler, Nothing, Nothing, prev, next][event.button]();
	});

	addEventListener("wheel", function(event)
	{
		if (event.deltaMode)
			[next, prev][event.deltaX + event.deltaY < 0]();
		else
			console.log(event.deltaX + event.deltaY);
	});
})();
