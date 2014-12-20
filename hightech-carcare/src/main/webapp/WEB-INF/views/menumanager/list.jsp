<%@ page language="java"  pageEncoding="UTF-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="tags" tagdir="/WEB-INF/tags" %>
<%@ page session="false" %>
 
<tags:template >
<jsp:body>
<table id="dg" title="后台管理>>菜单管理" class="easyui-datagrid"
		style="width: 100%px; height: 650px" url="./menumanager/" 
		toolbar="#toolbar" pagination="true" rownumbers="true"
		fitColumns="true" singleSelect="true">
		<thead>
			<tr>
				<th data-options="field:'menuname',width:100">菜单名称</th>
				<th data-options="field:'menucode',width:50">菜单编码</th>
				<th data-options="field:'uri',width:200">路径</th>
				<th data-options="field:'enabled',width:50">是否可用</th>
				<th data-options="field:'menuorder',width:50">顺序</th>
		 	</tr>
		</thead>
	</table>
	<div id="toolbar">
		<a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-add" plain="true" onclick="newMenu()">新增</a> 
		<a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-edit" plain="true" onclick="editMenu()">修改</a> 
		<a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-remove" plain="true" onclick="destroyMenu()">删除</a>
	</div>

	<div id="dlg" class="easyui-dialog" style="width: 450px; height: 350px; padding: 10px 20px" closed="true" buttons="#dlg-buttons">
		<div class="ftitle">系统菜单</div>
		<form id="fm" method="post" novalidate>
			<input type="hidden" name="id">
			<div class="fitem">
				<label>菜单名称:</label> <input name="menuname" class="easyui-validatebox textbox"  data-options="required:true" validType="minLength[6]" missingMessage="不能为空"/>
			</div>
			<div class="fitem">
				<label>菜单编码:</label> <input name="menucode" class="easyui-numberbox textbox" validType="minLength[6]" missingMessage="请填写整数！" data-options="required:true" >
			</div>
			<div class="fitem">
				<label>路径:</label> <input name="uri" class="easyui-validatebox textbox" validType="string" missingMessage="不能为空!" data-options="required:true">
			</div>
			<div class="fitem">
				<label>是否可用:</label>
				<input class="easyui-combobox" id="enabled"  name="enabled" url="../../dictmanager/dictenabled/" data-options="required:true" valueField="dictvalue" textField="dictname" panelHeight="auto" editable="true" missingMessage="不能为空！" >
			</div>
			<div class="fitem">
				<label>菜单顺序:</label> <input name="menuorder" class="easyui-numberbox textbox" validType="int" data-options="required:true"  missingMessage="请填写整数！">
			</div>
			<div class="fitem">
				<label>备注:</label> <textarea class="easyui-validatebox" name="remark"  validType="string"  cols="30" rows="3"></textarea>
			</div>
		</form>
	</div>
	<div id="dlg-buttons">
		<a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-ok" onclick="saveMenu()">保存</a> 
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
							   {field:'menucode',title:'菜单编号',width:100}, 
					           {field:'menuname',title:'菜单名称',width:100},
							   {field:'uri',title:'路径',width:200,align:'left'},
							   {field:'enabled',title:'是否可用',width:50,align:'center',formatter:function(value,row,index){
						                if (value){
						                    return "是";
						                } else {
						                    return "否";
						                }
						            }
								}, 
							   {field:'menuorder',title:'顺序',width:30,align:'center'} 
					        ]],
					onLoadSuccess:function(){
						$('#dg').datagrid('clearSelections'); //一定要加上这一句，要不然datagrid会记住之前的选择状态，删除时会出问题
					}
				});
		});
		
		function newMenu() {
			$('#dlg').dialog('open').dialog('setTitle', '新增菜单');
			$('#fm').form('clear');
			url = "menumanager/add/";
		}
		function editMenu() {
			var row = $('#dg').datagrid('getSelected');
			if (row) {
				$('#dlg').dialog('open').dialog('setTitle', '编辑菜单');
				$('#fm').form('load', row);
				if(row.enabled){
					$('#enabled').combobox('setValue',"true");
				}else{
					$('#enabled').combobox('setValue',"false");
				}
				url = "menumanager/edit/" + row.id;
			}
		}
		function saveMenu() {
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
						$.messager.show({
							title : '消息提示',
							msg : result.result
						});
					} else {
						$.messager.show({
							title : '错误提示',
							msg : result.errorMsg
						});
					}
				} 
			});
		}
		function destroyMenu() {
			var row = $('#dg').datagrid('getSelected');
			if (row) {
				var url = "menumanager/delete/"+row.id;
				$.messager.confirm('删除确认','确认删除该菜单?',
						function(value) {
							if (value) {
								$.get(url,function(result) {
									var result = eval('(' + result + ')');
									if (result.success) {
										$('#dg').datagrid('reload'); // reload the user data
										$.messager.show({
											title : '消息提示',
											msg : result.result
										});
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
			width:180px;
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
