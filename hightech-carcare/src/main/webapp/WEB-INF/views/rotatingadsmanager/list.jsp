<%@ page language="java"  pageEncoding="UTF-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="tags" tagdir="/WEB-INF/tags" %>
<%@ page session="false" %>
 
<tags:template >
 
<jsp:body>
<table id="dg" title="后台管理>>广告图片管理" class="easyui-datagrid"
		style="width: 100%px; height: 600px" url="." 
		toolbar="#toolbar" pagination="true" rownumbers="true"
		fitColumns="true" singleSelect="true" >
		<thead>
			<tr>
		 	</tr>
		</thead>
	</table>
	<div id="toolbar">
		<div>
			<a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-add" plain="true" onclick="newAds()">新增</a> 
			<a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-edit" plain="true" onclick="editAds()">修改</a> 
			<a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-remove" plain="true" onclick="destroyAds()">删除</a>
		</div>
	</div>
	<div id="dlg" class="easyui-dialog" style="width:450px; height: 300px; padding: 10px 20px" closed="true" buttons="#dlg-buttons">
		<div class="ftitle">广告图片信息</div>
		<form id="fm" method="post" novalidate enctype="multipart/form-data">
			<input type="hidden" name="id">
			<div class="fitem">
				<label>广告说明:</label> <input name="alt" class="easyui-validatebox textbox"  data-options="required:true" validType="maxLength[6]" missingMessage="不能为空"/>
			</div>
			<div class="fitem">
				<label>所属商品分类:</label> <input  name="type" class="easyui-combobox textbox" url="../../incategory/" data-options="required:true" valueField="code" textField="treename" panelHeight="auto" editable="true" missingMessage="请选择有效分类!">
			</div>
			<div class="fitem">
				<label>是否可用:</label> <input  name="enabled" class="easyui-combobox textbox" url="../../dictmanager/dictenabled/" data-options="required:true" valueField="dictvalue" textField="dictname" panelHeight="auto" editable="false" missingMessage="不能为空！" >
			</div>
			<div class="fitem">
				<label>展示顺序号:</label><input name="aorder" class="easyui-validatebox textbox"  data-options="required:true" validType="int" missingMessage="请填写顺序号">
			</div>
			<div class="fitem">
				<label>广告图片:</label> <input type="file" name="imageurl" class="easyui-validatebox"  data-options="required:true" missingMessage="请选择广告图片">
			</div>
		</form>
	</div>
	<div id="dlg-buttons">
		<a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-ok" onclick="saveAds()">保存</a> 
		<a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel" onclick="javascript:$('#dlg').dialog('close')">取消</a>
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
					          {field:'alt',title:'广告说明',width:100},
					          {field:'type',title:'商品分类',width:200}, 
							  {field:'imageurl',title:'图片所在位置',width:100},
							  {field:'enabled',title:'是否可用',width:100},
							  {field:'aorder',title:'展示顺序号',width:100}
					        ]],
					onLoadSuccess:function(){
						$('#dg').datagrid('clearSelections'); //一定要加上这一句，要不然datagrid会记住之前的选择状态，删除时会出问题
					}
				});
		});
		 
		function newAds() {
			$('#dlg').dialog('open').dialog('setTitle', '新增广告照片');
			$('#fm').form('clear');
			url = "add/";
		}
		function editAds() {
			var row = $('#dg').datagrid('getSelected');
			if (row) {
				$('#dlg').dialog('open').dialog('setTitle', '编辑广告照片');
				$('#fm').form('load', row);
				url = "edit/" + row.id;
			}
		}
		function saveAds() {
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
		function destroyAds() {
			var row = $('#dg').datagrid('getSelected');
			if (row) {
				var url = "delete/"+row.id;
				$.messager.confirm('删除确认','确认删除该广告图片?',
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
				$('#uploaddlg').dialog('open').dialog('setTitle', '商品广告图片');
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
