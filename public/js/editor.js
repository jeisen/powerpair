$(function() {
	window.firebase_url = 'sizzling-fire-124.firebaseio.com'
	window.firepadRef =  new Firebase(firebase_url);

	window.codeMirror = CodeMirror(document.getElementById('firepad'),
		{ lineWrapping: true, lineNumbers: true });

	// Implement save
	CodeMirror.commands.save = function() {
		var fileContents = codeMirror.getValue();
		$.post('/file/'+window.open_filename, {contents: fileContents}, function(data) {
			alert('Save completed.')
		});
	}

	// Populate the dropdown language selector
	CodeMirror.modeInfo.forEach(function(mode) {
		$("#mode-selector").append('<option value="'+mode.name+'">'+mode.name+'</option>');
	});
	CodeMirror.modeURL = "/js/codemirror/mode/%N.js";

	$("#mode-selector").change(function() {
	 language_mode = CodeMirror.modeForName($("#mode-selector").val()).mode;
	 window.codeMirror.setOption("mode", language_mode);
	 CodeMirror.autoLoadMode(window.codeMirror, language_mode);
	});

	// Create a random ID to use as our user ID (we must give this to firepad and FirepadUserList).
	var userId = Math.floor(Math.random() * 9999999999).toString();

	//// Create Firepad
	window.firepad = Firepad.fromCodeMirror(firepadRef, codeMirror,
	    { richTextToolbar: false, richTextShortcuts: false, userId: userId});

	//// Create FirepadUserList (with our desired userId).
	window.firepadUserList = FirepadUserList.fromDiv(window.firepadRef.child('users'),
	    document.getElementById('userlist'), userId);

	//// Create FileTree.
	function baseName(str) {
	   return new String(str).substring(str.lastIndexOf('/') + 1);
	}

	function getFileType(filename) {
	    if(filename.lastIndexOf(".") != -1) {
	      return filename.substring(filename.lastIndexOf('.') + 1);
	   }
	   return null;
	}

	function createFileTree(rootElement, files) {
		$.each(files, function(i, val) {
			var fullPath = val[0];
			var fileName = baseName(fullPath);
			var fileItem;
			if(val[1] == null) {
				// Not a directory
				var fileTypeClass;
				var fileType = getFileType(fileName);
				if(fileType != null) {
					fileTypeClass = "file ext_"+fileType;
				} else {
					fileTypeClass = "file";
				}
				fileItem = $("<li class='"+fileTypeClass+"'><a id='link-file-"+fullPath+"' href='#'>"+fileName+"</a></li>");
			} else {
				// directory, has contents
				fileItem = $("<li class='directory'><a id='link-dir-"+fullPath+"' href='#'>"+fileName+"</a></li>");

				var subdirRoot = $("<ul class='jqueryFileTree'></ul>");
				createFileTree(subdirRoot, val[1]);
				fileItem.append(subdirRoot);
			}

			rootElement.append(fileItem);
		});
	}

	// Define startsWith
	if (typeof String.prototype.startsWith != 'function') {
	  String.prototype.startsWith = function (str){
	    return this.slice(0, str.length) == str;
	  };
	}

	$.ajax('/files').done(function(resp) {
		var files = resp['project_files'];
		var dirRoot = $("<ul class='jqueryFileTree'></ul>");
		createFileTree(dirRoot, files);
		$("#filetree").append(dirRoot);

		$("#filetree a").each(function() {
			$(this).click(function() {
				var link_id = $(this).attr('id');
				if(link_id.startsWith('link-dir-')) {
					// Directory link
				} else if(link_id.startsWith('link-file-')) {
					var filePath = link_id.substring(10);
					$.ajax('/file/'+filePath).done(function(resp) {
						window.firepad.setText(resp['file_contents']);
						window.firepadRef.setOpenFile(resp['filename']);
					});
				}
			});
		});
	});

	//// Initialize contents.
	window.firepad.on('ready', function() {});

	//// Initialize open file trigger
    window.firepadRef.setOpenFile = function(filename) {
  	  openFileRef_ = this.child('openFile').set(filename);
    }
	window.firepadRef.child('openFile').on('value', function(dataSnapshot) {
		window.open_filename = dataSnapshot.val();
		$("#active-filename-content").html(window.open_filename);
		var fileMode = CodeMirror.modeForExtension(getFileType(window.open_filename));
		if(fileMode) {
			$("#mode-selector").val(fileMode.name).change();
		} else {
			$("#mode-selector").val('Plain Text').change();
		}
	});
});