<%@ page language="java"  pageEncoding="UTF-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="tags" tagdir="/WEB-INF/tags" %>
<%@ page session="false" %>
 
<tags:template >
 
<jsp:body>
<table id="dg" title="后台管理>>商品管理" class="easyui-datagrid"
		style="width: 100%px; height: 600px" url="productmanager/" 
		toolbar="#toolbar" pagination="true" rownumbers="true"
		fitColumns="true" singleSelect="true" >
		<thead>
			<tr>
				<th data-options="field:'productno',width:100">商品编码</th>
				<th data-options="field:'productname',width:50">商品名称</th>
				<th data-options="field:'incategory',width:50">所属分类</th>
				<th data-options="field:'brandId',width:50">所属品牌</th>
				<th data-options="field:'thumbnail',width:50">缩略图</th>
				<th data-options="field:'unitprice',width:50">单价</th>
				<th data-options="field:'specialdesc',width:50">特殊描述</th>
		 	</tr>
		</thead>
	</table>
	<div id="toolbar">
		<div>
			<a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-add" plain="true" onclick="newProduct()">新增</a> 
			<a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-edit" plain="true" onclick="editProduct()">修改</a> 
			<a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-remove" plain="true" onclick="destroyProduct()">删除</a>
		</div>
	</div>
	<div id="dlg" class="easyui-dialog" style="width: 850px; height: 600px; padding: 10px 20px" closed="true" buttons="#dlg-buttons">
		<div class="ftitle">商品信息</div>
		<form id="fm" method="post" novalidate enctype="multipart/form-data">
			<input type="hidden" name="id">
			<div class="fitem">
				<label>商品编码:</label> <input name="productno" class="easyui-validatebox textbox"  data-options="required:true" validType="maxLength[6]" missingMessage="不能为空"/>
			</div>
			<div class="fitem">
				<label>商品名称:</label> <input name="productname" class="easyui-validatebox textbox" validType="minLength[6]" missingMessage="不能为空" data-options="required:true" >
			</div>
			<div class="fitem">
				<label>所属分类:</label> <input name="incategory" class="easyui-combobox textbox" url="../incategory/" data-options="required:true" valueField="code" textField="treename" panelHeight="auto" editable="true" missingMessage="请选择有效分类!">
			</div>
			<div class="fitem">
				<label>所属品牌:</label> <input name="brandId" class="easyui-combobox textbox" url="../brands/" data-options="required:true" valueField="id" textField="brandname" panelHeight="auto" editable="false" missingMessage="请选择有效品牌！">
			</div>
			
			<div class="fitem">
				<label>零售单价:</label> <input name="unitprice" class="easyui-numberbox textbox"  min="0" precision="2" missingMessage="不能为空" data-options="required:true">
			</div>
			<div class="fitem">
				<label>折扣单价:</label> <input name="realprice" class="easyui-numberbox textbox"  min="0" precision="2" missingMessage="不能为空" data-options="required:true">
			</div>
			<div class="fitem">
				<label>商品大图:</label> <input type="file" name="productimage" class="easyui-validatebox"  data-options="required:false">
			</div>
			<div class="fitem">
				<label>商品描述:</label><textarea class="easyui-kindeditor" id="description" name="description"  validType="string"  style="width:100%;height:360px;" ></textarea>
			</div>
		</form>
	</div>
	<div id="dlg-buttons">
		<a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-ok" onclick="saveProduct()">保存</a> 
		<a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel" onclick="javascript:$('#dlg').dialog('close')">取消</a>
	</div>
	
	<div id="uploaddlg" class="easyui-dialog" style="width: 850px; height: 600px; padding: 10px 20px" closed="true" >
		<div class="ftitle">商品图片</div>
		<div class="ftitle"><img alt="" height="180px" width="140px">&nbsp;&nbsp;<img alt="" height="180px" width="150px">&nbsp;&nbsp;<img alt="" height="180px" width="150px">&nbsp;&nbsp;<img alt="" height="180px" width="150px">&nbsp;&nbsp;<img alt="" height="180px" width="150px"></div>
		<div class="ftitle">图片列表</div>
		<div class="ftitle">上传区域</div>
	</div>
	
	
	<script type="text/javascript">
		var url;
		$(function(){
			 $("#dg").datagrid({
					method:'post',
					idField:'id', //主键字段
					pagination:true, //显示分页
					rownumbers:true, //显示行号
					columns:[[ 
					          {field:'productno',title:'商品编码',width:100},
					           {field:'productname',title:'商品名称',width:200}, 
							   {field:'incategory',title:'所属分类',width:100,align:'left',formatter:function(value,rowData,rowIndex){
								   $.ajax({  
					                  type: "POST",  
					                   dataType: "json",
					                   async:false,
					                   url: "../incategory/",  
					                   success: function (data) {
					                	   for(var i=0;i<data.length;i++){
					                		   var category = data[i];
					                		   
					                		   if(category.code==value){
					                			   value = category.treename;
					                		   }
					                	   }
					                   } 
					               });
								  return value;
							   }},
							   {field:'brandId',title:'所属品牌',width:100,align:'left',formatter:function(value,rowData,rowIndex){
								   $.ajax({  
						                  type: "POST",  
						                   dataType: "json",
						                   async:false,
						                   url: "../brands/",  
						                   success: function (data) {
						                	   for(var i=0;i<data.length;i++){
						                		   var brand = data[i];
						                		   
						                		   if(brand.id==value){
						                			   value = brand.brandname;
						                		   }
						                	   }
						                   } 
						               });
								   return value;
							   }},
							   {field:'thumbnail',title:'缩略图',width:100,formatter:function(value){
								   if(value==null){
									   return '<img src=images/nopic.jpg, height=80,width=60 />';
								   }else{
									   return '<img src='+value+' height=80,width=60 />';
								   }
							   }},
							   {field:'unitprice',title:'零售单价',width:50,align:'left'},
							   {field:'realprice',title:'折扣单价',width:50,align:'left'}
					        ]],
					onLoadSuccess:function(){
						$('#dg').datagrid('clearSelections'); //一定要加上这一句，要不然datagrid会记住之前的选择状态，删除时会出问题
					}
				});
		});
		var editor;
		KindEditor.ready(function(K) {
			editor = K.create('textarea[name="description"]');
		});
		function newProduct() {
			$('#dlg').dialog('open').dialog('setTitle', '新增商品');
			$('#fm').form('clear');
			if(editor!=null){	
				editor.html("")
			}
			url = "productmanager/add/";
		}
		function editProduct() {
			var row = $('#dg').datagrid('getSelected');
			if (row) {
				$('#dlg').dialog('open').dialog('setTitle', '编辑商品');
				$('#fm').form('load', row);
				if(editor!=null){
					editor.html(row.description);
				}
				url = "productmanager/edit/" + row.id;
			}
		}
		function saveProduct() {
			$("#description").text(editor.html());
			$('#fm').form('submit', {
				url : url,
				onSubmit : function() {
					return $(this).form('validate');
				},
				success : function(result) {
					var result = eval('(' + result + ')');
					if (result.success) {
						$('#dlg').dialog('close'); // close the dialog
						$('#dg').datagrid('reload'); // reload the user data
					} else {
						$.messager.show({
							title : '错误提示',
							msg : result.errorMsg
						});
					}
				} 
			});
		}
		function destroyProduct() {
			var row = $('#dg').datagrid('getSelected');
			if (row) {
				var url = "productmanager/delete/"+row.id;
				$.messager.confirm('删除确认','确认删除该商品?',
						function(value) {
							if (value) {
								$.get(url,function(result) {
									var result = eval('(' + result + ')');
									if (result.success) {
										$('#dg').datagrid('reload'); // reload the user data
									} else {
										$.messager.show({ // show error message
											title : '错误提示',
											msg : result.msg
										});
									}
								});
							}
						});
			}
		}
		
		function uploadPic(){
			var row = $('#dg').datagrid('getSelected');
			if (row) {
				$('#uploaddlg').dialog('open').dialog('setTitle', '商品图片');
			}else{
				$.messager.show({ // show error message
					title : '提示信息',
					msg : "请选择产品后上传图片！"
				});
			}
		}
	</script>
	<style type="text/css">
#fm {
	margin: 0;
	padding: 10px 30px;
}

.ftitle {
	font-size: 14px;
	font-weight: bold;
	padding: 5px 0;
	margin-bottom: 10px;
	border-bottom: 1px solid #ccc;
}

.row{
	background-color: red;
	
}

.fitem {
	margin-left:10px;
	margin-bottom: 5px;
	float:left;
	
}

.fitem label {
	display: inline-block;
	width: 80px;
}

.textbox{
			height:20px;
			width:150px;
			margin:0;
			padding:0 2px;
			box-sizing:content-box;
		}
		
.textbox200{
			height:20px;
			width:180px;
			margin:0;
			padding:0 2px;
			box-sizing:content-box;
		}
		
.comboBox{
			height:20px;
			width:80px;
			margin:0;
			padding:0 2px;
			box-sizing:content-box;
		}
</style>
</jsp:body>
</tags:template>
