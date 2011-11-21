var tweet = "";

function envoiTweet() {
   window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(tweet),
       '',
       'status=no, scrollbars=no, menubar=no, width=550, height=300')
}
function ecriTweet(texte) {
	tweet += texte+" ";
	var txtTweet = document.getElementById('textTwett');
	txtTweet.firstChild.firstChild.data = tweet;
}