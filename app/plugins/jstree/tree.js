function TreeConfig(){
}

TreeConfig.prototype.contextMenu = {};

TreeConfig.prototype.baseUrl = "";
TreeConfig.prototype.rootType = "";
TreeConfig.prototype.baseAction = "Ajaxtree.do";
TreeConfig.prototype.lang = "en";
TreeConfig.prototype.plugins = [ "ui", "types", "contextmenu", "search", "wholerow" ];
TreeConfig.prototype.additionalPlugins = [];
TreeConfig.prototype.selector = ".tree-container"
TreeConfig.prototype.contextMenu = [];
TreeConfig.prototype.rootTypeParam = "";
// the text with local language will use in js
TreeConfig.prototype.message = {};

TreeConfig.prototype.popoverSelector = '.has-popover';
TreeConfig.prototype.popoverTemplate = 
	['<span>',
    	 '<span class="node-caption"/>',
    	 '<button class="btn btn-xs has-popover"',
    		'data-title="popover-caption"',
    		'data-content="popover-detailInfo"',
    		'data-html= "true"',
    		'style="background-color: transparent; border-color: transparent;padding: 0px 0px;height: 100%;" >',
        	'<span class="glyphicon glyphicon-plus-sign" title="Detail" style="color:#5bc0de"></span>',
    	'</button>',
    '</span>'].join(" ");


function Tree(options) {
  this.options = $.extend({}, new TreeConfig(), options);
  this.init();
  this.initPopover();
}

/**
 * root node adds a prameter
 * NH 26.9.16: added rootTypeParameter
 * 27.9.16: added popover links
 * @param node
 * @param isRoot
 * @returns {String}
 */
Tree.prototype.getDataUrl = function(node, isRoot){
	var returnUrl = this.options.baseUrl + this.options.baseAction + "?";
	if (isRoot) {
		// uses the nodeType configured for root
		returnUrl = returnUrl + "root=1&nt="+ this.options.rootType;
		if (this.options.rootTypeParam.length > 0) {
			returnUrl = returnUrl + "&p=" + this.options.rootTypeParam;
		}
	} else {
		// get the prefix=nodetype. it is defined until the first "-"
		var pos = node.id.indexOf("-")
		// get the id-part
		var nodeId = node.id.substr(pos+1);
		//get the nodetype part
		var nodetype = node.id.substr(0,pos);
		returnUrl = returnUrl + "nt="+nodetype + "&idstr="+nodeId;
	} 
    return returnUrl;
}

Tree.prototype.getDataFilter = function(data, type){
    // this method is intentionally do nothing
}

Tree.prototype.init = function() {
	var that = this;
	var tree = $(this.options.selector).jstree(
			{
				"core": {
					"animation" : 0,
					// activity mode. will be configable later
					"check_callback": true,
					"themes" : {
						"stripes" : true,
						"responsive": false,
					},
					"data": {
						"url": function(node){
							return node.id === '#' ?
								that.getDataUrl.call(that, node, true) :
								that.getDataUrl.call(that, node, false);
						},
						"data": function(node){
							return "data=" + JSON.stringify(node.id);
						},
						"dataType": "json",
						"method": "get",
						"dataFilter": function(data, type){
							return that.getDataFilter.call(that, data, type);
						}
					} //data
				}, // core
				"contextmenu" : {
					"items": function(node) {
						//TODO: It should be config-able in TreeConfig
						var result = {};
						// Default actions needed in every node in every tree 
						var expandAll = {
								"separator_before": false,
								"separator_after": false,
								"label": "Expand all",
								"action": function (obj) { 
									that.jstree.open_all(node);
								}
						};
						result.expandAll = expandAll;

						var collapsedAll = {
								"separator_before": false,
								"separator_after": false,
								"label": "Collapse all",
								"action": function (obj) { 
									that.jstree.close_all(node);
								}
						};
						result.collapsedAll = collapsedAll;

						var test = {
								"separator_before": true,
								"separator_after": false,
								"label": "Show node ID",
								"action": function (node) { 
									alert("ID of node:" + node.id);
								}
						};
						result.test = test;
						
						return result;
					}
				},// conetextmenu	            
				"search" : {
					"case_insensitive" : true, 
					"ajax" : true,
					"show_only_matches" : true
				}, // search	      
				"plugins" : that.options.plugins.concat(that.options.additionalPlugins),
			}
	);
	tree.on("open_node.jstree", this.handleOpenNode);
	this.jstree = tree.jstree(true);
};

Tree.prototype.handleOpenNode = function(e, node){
	//TODO: Add business logic when open a node in here
}

Tree.prototype.initPopover = function(){
	var that = this;
	// Init popover for whole page
	this.popover = $(this.options.selector).popover({
		selector: this.options.popoverSelector,
		container: this.options.selector,
		html: true,
		trigger: "manual",
		placement: "right",
	});
	 
	$('body').on('click', function(event){
	    var clicktarget = $(event.target).is(that.options.popoverSelector) ? 
	    		$(event.target) :   
	    			// Handle when click on icon in chrome, it return span, not button
	    			$(event.target).parent();
	    if (!clicktarget.is(that.options.popoverSelector)) {
	    	// Close popover when click out side of container
	    	$(that.options.selector).find(that.options.popoverSelector).popover('hide');
	    }else{
	    	that.showPopover(that.jstree.get_selected(true)[0], clicktarget);
	    }
	    
	})
};

/*
 * Handle business logic to build popover content in here
 * @node: the data of selected node
 * @target: the clicked element
 */
Tree.prototype.showPopover = function(node, target){
	// Close other other popovers except the clicked one
	$(this.options.selector).find(this.options.popoverSelector).not(target).popover('hide');
	target.popover('show');
}
/*
 * Build a node with popover to show detail information
 * 
 */
Tree.prototype.buildNodeWithPopover = function(nodeCaption, nodeDetailInfo, nodeType){
	var detailComponent = $($.parseHTML(this.options.popoverTemplate));
	detailComponent.find('button').attr('data-title', nodeCaption);
	detailComponent.find('button').attr('data-content', nodeDetailInfo);
	detailComponent.find('.node-caption').html(nodeCaption);
//	var iconHtml = detailComponent.html();
//	detailComponent.html(nodeCaption + iconHtml);
	return detailComponent[0].outerHTML;
}


	    


