(function(){var d=YAHOO.util.Dom,h=YAHOO.util.Event;Alfresco.module.RulesPropertyPicker=function(j){Alfresco.module.RulesPropertyPicker.superclass.constructor.call(this,j);this.name="Alfresco.module.RulesPropertyPicker";Alfresco.util.ComponentManager.reregister(this);this.preferencesService=new Alfresco.service.Preferences();this.rulePropertySettings={};this.options=YAHOO.lang.merge(this.options,Alfresco.util.deepCopy(Alfresco.module.RulesPropertyPicker.superclass.options,{copyFunctions:true}));var k=this;this.options.dataTableColumnDefinitions.push({key:"item",sortable:false,width:100,formatter:function(m,l,n,o){k._formatShowInMenu(m,l,n,o)}});return this};var e=Alfresco.module.RulesPropertyPicker;YAHOO.lang.augmentObject(e,{PROPERTY_SHOW:"show",PROPERTY_HIDE:"hide"}),YAHOO.extend(Alfresco.module.RulesPropertyPicker,Alfresco.module.PropertyPicker,{options:{rulesPropertyPickerTemplateUrl:Alfresco.constants.URL_SERVICECONTEXT+"modules/rules/property-picker"},preferencesService:null,rulePropertySettings:{},onTemplateLoaded:function f(j){Alfresco.util.Ajax.request({url:this.options.rulesPropertyPickerTemplateUrl,dataObj:{htmlid:this.id},successCallback:{fn:this.onRulesPropertyPickerTemplateLoaded,obj:j,scope:this},failureMessage:this.msg("message.load.template.error",this.options.rulesPropertyPickerTemplateUrl),execScripts:true})},onRulesPropertyPickerTemplateLoaded:function g(j,k){var l=document.createElement("div");l.setAttribute("style","display:none");l.innerHTML=j.serverResponse.responseText;this.preferencesService.request(Alfresco.service.Preferences.RULE_PROPERTY_SETTINGS,{successCallback:{fn:function(n,m){this.rulePropertySettings=Alfresco.util.findValueByDotNotation(n.json,"org.alfresco.share.rule.properties",{});Alfresco.module.RulesPropertyPicker.superclass.onTemplateLoaded.call(this,m)},scope:this,obj:k},failureMessage:this.msg("message.load.rulePropertySettings.error")})},msg:function b(k){var j=Alfresco.util.message.call(this,k,this.name,Array.prototype.slice.call(arguments).slice(1));if(j==k){j=Alfresco.util.message(k,"Alfresco.module.PropertyPicker",Array.prototype.slice.call(arguments).slice(1))}return j},_formatShowInMenu:function a(m,l,n,o){var k=l.getData(),j=document.createElement("input");j.setAttribute("type","checkbox");if(this.rulePropertySettings[k.id]==e.PROPERTY_SHOW){j.setAttribute("checked","true")}else{j.removeAttribute("checked")}h.addListener(j,"change",this.onCheckBoxClick,{checkBoxEl:j,propertyData:k},this);m.appendChild(j)},onCheckBoxClick:function a(k,l){l.checkBoxEl.setAttribute("disabled","true");l.state=l.checkBoxEl.checked?e.PROPERTY_SHOW:e.PROPERTY_HIDE;this.rulePropertySettings[l.propertyData.id]=l.state;var j={failureCallback:{fn:function(m,o){var n=o.propertyData;Alfresco.util.PopupManager.displayPrompt({text:this.msg("message.addFavouriteProperty.failure",n.label)});o.checkBoxEl.removeAttribute("disabled");if(o.checkBoxEl.checked){this.rulePropertySettings=e.PROPERTY_HIDE;o.checkBoxEl.removeAttribute("checked")}else{this.rulePropertySettings=e.PROPERTY_SHOW;o.checkBoxEl.setAttribute("checked","true")}},obj:l,scope:this},successCallback:{fn:function(m,n){n.checkBoxEl.removeAttribute("disabled");YAHOO.Bubbling.fire("rulePropertySettingsChanged",{property:n.propertyData,state:n.state})},scope:this,obj:l}};this.preferencesService.set(Alfresco.service.Preferences.RULE_PROPERTY_SETTINGS+"."+l.propertyData.id,l.state,j)},_showDialog:function c(){d.addClass(this.widgets.dialog.body.parentNode,"rules-property-picker");Alfresco.module.RulesPropertyPicker.superclass._showDialog.call(this)}});var i=new Alfresco.module.RulesPropertyPicker("null")})();