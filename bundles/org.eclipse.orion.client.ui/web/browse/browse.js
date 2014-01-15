/*******************************************************************************
 * @license
 * Copyright (c) 2011, 2012 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials are made 
 * available under the terms of the Eclipse Public License v1.0 
 * (http://www.eclipse.org/legal/epl-v10.html), and the Eclipse Distribution 
 * License v1.0 (http://www.eclipse.org/org/documents/edl-v10.html). 
 *
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *******************************************************************************/
/*global define window console eclipse orion*/

define([
	'orion/bootstrap', 
	'orion/PageUtil', 
	'orion/contentTypes',
	//'orion/fileClient',
	'orion/widgets/browse/readonlyFileClient',
	'orion/highlight',
	'orion/widgets/browse/staticDataSource',
	'orion/widgets/browse/fileBrowser',
	'orion/Deferred',
	'plugins/filePlugin/HTML5LocalFileImpl'
], function(mBootstrap, PageUtil, mContentTypes, mFileClient, Highlight, mStaticDataSource, mFileBrowser, mDeferred) {
		orion = {Deferred: mDeferred};
		window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
		if (window.requestFileSystem) {
			window.requestFileSystem(window.TEMPORARY, 10*1024*1024 , function(fs) {
				var service = new eclipse.HTML5LocalFileServiceImpl(fs);
				var serviceProperties = {
					Name: "HTML5 Local File contents",
					pattern: service._rootLocation,//"filesystem:http://libingw.orion.eclipse.org:8080/temporary/",
					serviceId: 1,
					top: service._rootLocation
				};
				var serviceRef = {
					id: 123,
					serviceProperties: serviceProperties,
					impl: service
				};
				
				var fBrowser = new mFileBrowser.FileBrowser({
					parent: "fileBrowser",//Required 
					fileClient: new mFileClient.FileClient([serviceRef]),
				}); 
				window.addEventListener("hashchange", function() { //$NON-NLS-0$
					fBrowser.refresh(PageUtil.hash());
				});
				fBrowser.refresh(PageUtil.hash());
			}, function(error) {
				console.log(error);
			});
		} 
	/*
	mBootstrap.startup().then(function(core) {
		//var cTypeService = new mContentTypes.ContentTypeRegistry(mStaticDataSource.ContentTypes);
		
		var fBrowser = new mFileBrowser.FileBrowser({
			parent: "fileBrowser",//Required 
			//maxEditorHeight: 800,
			fileClient: new mFileClient.FileClient(core.serviceRegistry) //Required. But will be different implementation that does not require service registration
			//syntaxHighlighter: new mStaticDataSource.SyntaxHighlighter(), //Optional. If not defined the deafult one is used.
			//syntaxHighlighter: new Highlight.SyntaxHighlighter(core.serviceRegistry, cTypeService), //Required. But will be different implementation that does not require service registration
			//contentTypeService: cTypeService,//Optional. If not defined the deafult one is used.
			//contentTypeService: new mContentTypes.ContentTypeRegistry(core.serviceRegistry),
			//preferences: null//core.preferences //Optional. If defined, should not depend on bootstrap
		}); 
		window.addEventListener("hashchange", function() { //$NON-NLS-0$
			fBrowser.refresh(PageUtil.hash());
		});
		fBrowser.refresh(PageUtil.hash());
		
	});*/
});
