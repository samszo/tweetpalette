var tweet = "";

function envoiTweet() {
   //console.log("send : " + tweet);
   window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(tweet), '', 'status=no, scrollbars=no, menubar=no, width=800, height=600');
   tweet = "";
}

function ecriTweet(texte) {
   tweet += texte+" ";
   //var txtTweet = document.getElementById('textTwett');
   //txtTweet.firstChild.firstChild.data = tweet;
   envoiTweet();
}

/*
function survol(evt)
{
	console.log(document.getElementById("monId").getAttributeNS(null,"fill"));
	var red = '#F0F0F0';
	// var test = document.getElementById('monId');
	 evt.target.setAttributeNS(null,"fill","rgb(red)");
	 //test.setAttribute(null,"fill","#F00");
}
*/