<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Basic CRUD Application - jQuery EasyUI CRUD Demo</title>
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/resources/css/easyui.css">
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/resources/css/icon.css">
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/resources/css/demo.css">
	<script type="text/javascript" src="<%=request.getContextPath()%>/resources/scripts/jquery-1.6.min.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/resources/scripts/jquery.easyui.min.js"></script>
</head>
<body>
	<h2>Basic CRUD Application</h2>
	<p>Click the buttons on datagrid toolbar to do crud actions.</p>

	<table id="dg" title="My Users" class="easyui-datagrid"
		style="width: 700px; height: 250px" url="get_users.php"
		toolbar="#toolbar" pagination="true" rownumbers="true"
		fitColumns="true" singleSelect="true">
		<thead>
			<tr>
				<th field="firstname" width="50">First Name</th>
				<th field="lastname" width="50">Last Name</th>
				<th field="phone" width="50">Phone</th>
				<th field="email" width="50">Email</th>
			</tr>
		</thead>
	</table>
	<div id="toolbar">
		<a href="javascript:void(0)" class="easyui-linkbutton"
			iconCls="icon-add" plain="true" onclick="newUser()">New User</a> <a
			href="javascript:void(0)" class="easyui-linkbutton"
			iconCls="icon-edit" plain="true" onclick="editUser()">Edit User</a> <a
			href="javascript:void(0)" class="easyui-linkbutton"
			iconCls="icon-remove" plain="true" onclick="destroyUser()">Remove
			User</a>
	</div>

	<div id="dlg" class="easyui-dialog"
		style="width: 400px; height: 280px; padding: 10px 20px" closed="true"
		buttons="#dlg-buttons">
		<div class="ftitle">User Information</div>
		<form id="fm" method="post" novalidate>
			<div class="fitem">
				<label>First Name:</label> <input name="firstname"
					class="easyui-validatebox" required="true">
			</div>
			<div class="fitem">
				<label>Last Name:</label> <input name="lastname"
					class="easyui-validatebox" required="true">
			</div>
			<div class="fitem">
				<label>Phone:</label> <input name="phone">
			</div>
			<div class="fitem">
				<label>Email:</label> <input name="email" class="easyui-validatebox"
					validType="email">
			</div>
		</form>
	</div>
	<div id="dlg-buttons">
		<a href="javascript:void(0)" class="easyui-linkbutton"
			iconCls="icon-ok" onclick="saveUser()">Save</a> <a
			href="javascript:void(0)" class="easyui-linkbutton"
			iconCls="icon-cancel" onclick="javascript:$('#dlg').dialog('close')">Cancel</a>
	</div>
	<script type="text/javascript">
		var url;
		function newUser() {
			$('#dlg').dialog('open').dialog('setTitle', 'New User');
			$('#fm').form('clear');
			url = 'save_user.php';
		}
		function editUser() {
			var row = $('#dg').datagrid('getSelected');
			if (row) {
				$('#dlg').dialog('open').dialog('setTitle', 'Edit User');
				$('#fm').form('load', row);
				url = 'update_user.php?id=' + row.id;
			}
		}
		function saveUser() {
			$('#fm').form('submit', {
				url : url,
				onSubmit : function() {
					return $(this).form('validate');
				},
				success : function(result) {
					var result = eval('(' + result + ')');
					if (result.errorMsg) {
						$.messager.show({
							title : 'Error',
							msg : result.errorMsg
						});
					} else {
						$('#dlg').dialog('close'); // close the dialog
						$('#dg').datagrid('reload'); // reload the user data
					}
				}
			});
		}
		function destroyUser() {
			var row = $('#dg').datagrid('getSelected');
			if (row) {
				$.messager.confirm('Confirm',
						'Are you sure you want to destroy this user?',
						function(r) {
							if (r) {
								$.post('destroy_user.php', {
									id : row.id
								}, function(result) {
									if (result.success) {
										$('#dg').datagrid('reload'); // reload the user data
									} else {
										$.messager.show({ // show error message
											title : 'Error',
											msg : result.errorMsg
										});
									}
								}, 'json');
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
</style>
</body>
</html>
