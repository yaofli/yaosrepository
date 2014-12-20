<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="tags" tagdir="/WEB-INF/tags"%>
<%@ page session="false"%>

<tags:template>

	<jsp:body>
    <table id="dg" title="后台管理 >>商品分类管理" class="easyui-datagrid"
			style="width: 100% px; height: 650px" url="./categorymanager/" toolbar="#toolbar"
			pagination="true" rownumbers="true" fitColumns="true"
			singleSelect="true">
		<thead>
			<tr>
				<th field="code" width="50">分类编码</th>
				<th field="treename" width="100">分类名称</th>
				<th field="uri" width="100">指向路径</th>
				<th field="importentflag" width="20">主要标志</th>
				<th field="enabled" width="20">是否可用</th>
				<th field="categoryorder" width="20">顺序</th>
			</tr>
		</thead>
	</table>
	<div id="toolbar">
		<a href="javascript:void(0)" class="easyui-linkbutton"
				iconCls="icon-add" plain="true" onclick="newCategory()">新增</a> 
		<a href="javascript:void(0)" class="easyui-linkbutton"
				iconCls="icon-edit" plain="true" onclick="editCategory()">修改</a> 
		<a href="javascript:void(0)" class="easyui-linkbutton"
				iconCls="icon-remove" plain="true" onclick="destroyCategory()">删除</a>
	</div>

	<div id="dlg" class="easyui-dialog"
			style="width: 400px; height: 350px; padding: 10px 20px" closed="true"
			buttons="#dlg-buttons">
		<div class="ftitle">商品分类信息</div>
		<form id="fm" method="post" novalidate>
			<input type="hidden" name="id">
			<div class="fitem">
				<label>分类编码:</label> <input name="code"
						class="easyui-validatebox textbox" required="true">
			</div>
			<div class="fitem">
				<label>分类名称:</label> <input name="treename"
						class="easyui-validatebox textbox" required="true">
			</div>
			<div class="fitem">
				<label>路径:</label> <input name="uri"
						class="easyui-validatebox textbox" validType="string">
			</div>
			<div class="fitem">
				<label>顺序号:</label> <input name="categoryorder"
						class="easyui-validatebox textbox" validType="Integer"
						required="true">
			</div>
			<div class="fitem">
				<label>重要标识:</label> <input name="importentflag" id="importentflag"
						class="easyui-combobox" url="../dictmanager/dictenabled/"
						data-options="required:true" valueField="dictvalue"
						textField="dictname" panelHeight="auto" editable="false"
						missingMessage="不能为空！" />
			</div>
			<div class="fitem">
				<label>是否可用:</label> <input name="enabled" id="enabled"
						class="easyui-combobox" url="../dictmanager/dictenabled/"
						data-options="required:true" valueField="dictvalue"
						textField="dictname" panelHeight="auto" editable="false"
						missingMessage="不能为空！">
			</div>
		</form>
	</div>
	
	<div id="dlg-buttons">
		<a href="javascript:void(0)" class="easyui-linkbutton"
				iconCls="icon-ok" onclick="saveCategory()">保存</a> 
		<a href="javascript:void(0)" class="easyui-linkbutton"
				iconCls="icon-cancel" onclick="javascript:$('#dlg').dialog('close')">取消</a>
	</div>
	
	<script type="text/javascript">
		var url;
		$(function() {
			$("#dg").datagrid({
				method : 'post',
				idField : 'id', //主键字段
				pagination : true, //显示分页
				rownumbers : true, //显示行号
				columns : [ [ {
					field : 'code',
					title : '分类编码',
					width : 100
				}, {
					field : 'treename',
					title : '分类名称',
					width : 100
				}, {
					field : 'uri',
					title : '路径',
					width : 200,
					align : 'left'
				}, {
					field : 'importentflag',
					title : '重要标识',
					width : 50,
					align : 'center',
					formatter : function(value, row, index) {
						if (value) {
							return "是";
						} else {
							return "否";
						}
					}
				}, {
					field : 'enabled',
					title : '重要标识',
					width : 50,
					align : 'center',
					formatter : function(value, row, index) {
						if (value) {
							return "是";
						} else {
							return "否";
						}
					}
				}, {
					field : 'categoryorder',
					title : '顺序',
					width : 30,
					align : 'center'
				} ] ],
				onLoadSuccess : function() {
					$('#dg').datagrid('clearSelections'); //一定要加上这一句，要不然datagrid会记住之前的选择状态，删除时会出问题
				}
			});
		});

		function newCategory() {
			$('#dlg').dialog('open').dialog('setTitle', '新增分类');
			$('#fm').form('clear');
			url = "categorymanager/add/";
		}
		function editCategory() {
			var row = $('#dg').datagrid('getSelected');
			if (row) {
				$('#dlg').dialog('open').dialog('setTitle', '编辑分类');
				$('#fm').form('load', row);
				if (row.importentflag) {
					$('#importentflag').combobox('setValue', "true");
				} else {
					$('#importentflag').combobox('setValue', "false");
				}

				if (row.enabled) {
					$('#enabled').combobox('setValue', "true");
				} else {
					$('#enabled').combobox('setValue', "false");
				}

				url = "categorymanager/edit/" + row.id;
			}
		}
		function saveCategory() {
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
		function destroyCategory() {
			var row = $('#dg').datagrid('getSelected');
			if (row) {
				var url = "categorymanager/delete/" + row.id;
				$.messager.confirm('删除确认', '确认删除该分类?', function(value) {
					if (value) {
						$.get(url, function(result) {
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

.textbox {
	height: 20px;
	width: 180px;
	margin: 0;
	padding: 0 2px;
	box-sizing: content-box;
}

.textbox200 {
	height: 20px;
	width: 180px;
	margin: 0;
	padding: 0 2px;
	box-sizing: content-box;
}

.comboBox {
	height: 20px;
	width: 80px;
	margin: 0;
	padding: 0 2px;
	box-sizing: content-box;
}
</style>
</jsp:body>
</tags:template>
