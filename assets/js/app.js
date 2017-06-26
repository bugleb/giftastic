$(document).ready(function() {
	const app = {
		buttons: [
			'hockey', 'football', 'baseball', 'stanley cup', 'super bowl', 'world series',
			'pittsburgh penguins', 'pittsburgh steelers', 'pittsburgh pirates'
		],
		playing: [],
		response: null,
		addButton: function(content) {
			const button = $('<button>')
								.addClass('btn btn-primary')
								.attr('id', content)
								.text(content.toUpperCase());
			$('#buttons').append(button);
		},
		updateButtons: function() {
			for (let i = 0; i < this.buttons.length; i++) {
				this.addButton(this.buttons[i]);
			}
		},
		displayGifs: function() {
			$('#gifs').empty();

			for (let i = 0; i < this.response.data.length; i++) {
				const div = $('<div>').addClass('gif-div');
				div.append($('<p>').text(`Rating: ${this.response.data[i].rating.toUpperCase()}`));
				const img = $('<img>')
								.addClass('gif-image')
								.attr('src', this.response.data[i].images.original_still.url)
								.attr('id', i);
				div.append(img);
				$('#gifs').append(div);
			}
		},
		queryGiphy: function(term) {
			const queryURL = 
				`https://api.giphy.com/v1/gifs/search?api_key=e918fb5ae336493ca8d19d773d80c71c&q=${term}&limit=10&rating=G`;

		    $.ajax({
		      url: queryURL,
		      method: 'GET'
		    }).done(function(response) {
		      app.response = response;
		      app.displayGifs();
		    });
		}
	}

	app.updateButtons();

	$('#buttons').on('click', '.btn', function() {
		app.queryGiphy($(this).attr('id'));
	});

	$('#add-sport').on('click', '#add-button', function() {
		const content = $('#add-sport-input').val();

		if (content.length > 0) {
			app.buttons.push(content);
			app.addButton(content);
		}
	});

	$('#gifs').on('click', '.gif-image', function() {
		const id = $(this).attr('id');

		const index = app.playing.indexOf(id);
		if (index === -1) {
			app.playing.push(id);
			$(`#${id}`).attr('src', app.response.data[id].images.original.url);
		} else {
			app.playing.splice(index, 1);
			$(`#${id}`).attr('src', app.response.data[id].images.original_still.url);
		}
	});
});