<%@ page language="java"  pageEncoding="UTF-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="tags" tagdir="/WEB-INF/tags" %>
<%@ page session="false" %>

<tags:template >

<jsp:body>
<table id="dg" title="后台管理 >>商品品牌管理" class="easyui-datagrid"
		style="width: 100%px; height: 650px" url="brandmanager/" 
		toolbar="#toolbar" pagination="true" rownumbers="true"
		fitColumns="true" singleSelect="true">
		<thead>
			<tr>
				<th field="brandname" width="50">品牌名称</th>
				<th field="brandurl" width="100">品牌路径</th>
				<th field="brandDesc" width="100">品牌描述</th>
			</tr>
		</thead>
	</table>
	<div id="toolbar">
		<a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-add" plain="true" onclick="newBrand()">新增</a> 
		<a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-edit" plain="true" onclick="editBrand()">修改</a> 
		<a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-remove" plain="true" onclick="destroyBrand()">删除</a>
	</div>

	<div id="dlg" class="easyui-dialog" style="width: 800px; height: 600px; padding: 10px 20px" closed="true" buttons="#dlg-buttons">
		<div class="ftitle">商品品牌信息</div>
		<form id="fm" method="post" novalidate>
			<input type="hidden" name="id">
			<div class="fitem">
				<label>品牌名称:</label> <input name="brandname" class="easyui-validatebox textbox" validType="minLength[30]" required="true" missingMessage="不能为空">
			</div>
<!-- 			<div class="fitem"> -->
<!-- 				<label>品牌路径:</label> <input name="brandurl" class="easyui-validatebox textbox" validType="minLength[100]" > -->
<!-- 			</div> -->
			<div class="fitem">
				<label>品牌描述:</label><textarea class="easyui-kindeditor width:80%" id="brandDesc" name="brandDesc" style="width:100%;height:380px;" ></textarea>
			</div>
		</form>
	</div>
	
	<div id="dlg-buttons">
		<a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-ok" onclick="saveBrand()">保存</a> 
		<a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cancel" onclick="javascript:$('#dlg').dialog('close')">取消</a>
	</div>
	
	<script type="text/javascript">
		var url;
		var editor;
		$(function(){
			 $("#dg").datagrid({
					method:'post',
					idField:'id', //主键字段
					pagination:true, //显示分页
					rownumbers:true, //显示行号
					columns:[[ 
					           {field:'brandname',title:'品牌名称',width:100}
// 					           {field:'brandurl',title:'品牌路径',width:100}, 
// 							   {field:'brandDesc',title:'品牌描述',width:200,align:'left'}
					        ]],
					onLoadSuccess:function(){
						$('#dg').datagrid('clearSelections'); //一定要加上这一句，要不然datagrid会记住之前的选择状态，删除时会出问题
					}
				});
			 
			 
		});
		
		var editor;
		KindEditor.ready(function(K) {
			editor = K.create('textarea[name="brandDesc"]');
		});
		function newBrand() {
			$('#dlg').dialog('open').dialog('setTitle', '新增产品分类');
			$('#fm').form('clear');
			if(editor!=null){	
				editor.html("")
			}
			url = "brandmanager/add/";
		}
		function editBrand() {
			var row = $('#dg').datagrid('getSelected');
			if (row) {
				$('#dlg').dialog('open').dialog('setTitle', '编辑产品分类');
				$('#fm').form('load', row);
				 
				if(editor!=null){ 
					editor.html(row.brandDesc)
				}
				url = "brandmanager/edit/" + row.id;
			}
		}
		function saveBrand() {
			$("#brandDesc").text(editor.html());
			$('#fm').form('submit', {
				url : url,
				method:"post",
				onLoadSuccess:function(data){
					alert(data)
				},
				onSubmit : function() {
					
					return $(this).form('validate');
				},
				success : function(result) {
					var result = eval('(' + result + ')');
					if (result.success) {
						$('#dlg').dialog('close'); // close the dialog
						$.messager.show({
							title : '消息提示',
							msg : '保存成功！'
						});
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
		function destroyBrand() {
			var row = $('#dg').datagrid('getSelected');
			if (row) {
				var url = "brandmanager/delete/"+row.id;
				$.messager.confirm('删除确认','确认删除该分类?',
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

.fitem {
	margin-bottom: 5px;
}

.fitem label {
	display: inline-block;
	width: 80px;
}

.textbox{
			height:20px;
			width:300px;
			margin:0;
			padding:0 2px;
			box-sizing:content-box;
		}
</style>
</jsp:body>
</tags:template>
