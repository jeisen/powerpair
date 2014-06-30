$(function() {
	window.firepadRef =  new Firebase(firebase_url);

	window.codeMirror = CodeMirror(document.getElementById('firepad'),
		{ lineWrapping: true, lineNumbers: true });

	// Create a random ID to use as our user ID (we must give this to firepad and FirepadUserList).
	var userId = Math.floor(Math.random() * 9999999999).toString();

	//// Create Firepad
	window.firepad = Firepad.fromCodeMirror(firepadRef, codeMirror,
	    { richTextToolbar: false, richTextShortcuts: false, userId: userId});

	//// Initialize contents.
	window.firepad.on('ready', function() {});
});