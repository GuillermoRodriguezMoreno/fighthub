"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal,
  Pencil,
  Plus,
  Trash,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UseGetUsersQuery } from "@/hooks/user/use-get-users-query";
import { Badge } from "../ui/badge";
import { UserResponse } from "@/domains/user";
import { EditUserDialog } from "./edit-user-dialog";
import { DeleteUserDialog } from "./delete-user-dialog";
import { NewUserDialog } from "./new-user-dialog";
import { UserTablePagination } from "./user-table-pagination";

export function UserTable() {
  const { data, isError, isLoading } = UseGetUsersQuery();

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [selectedUser, setSelectedUser] = React.useState<UserResponse | null>(
    null,
  );
  const [NewUserDialogIsOpen, setNewUserDialogIsOpen] =
    React.useState<boolean>(false);
  const [editUserDialogIsOpen, setEditDialogIsOpen] =
    React.useState<boolean>(false);
  const [deleteUserDialogIsOpen, setDeleteDialogIsOpen] =
    React.useState<boolean>(false);

  const handleNewUserClick = () => {
    setNewUserDialogIsOpen(true);
  };
  const handleSaveNewUserChanges = () => {
    setNewUserDialogIsOpen(false);
  };
  const handleCancelNewUserChanges = () => {
    setNewUserDialogIsOpen(false);
  };
  const handleEditClick = (user: UserResponse) => {
    setSelectedUser(user);
    setEditDialogIsOpen(true);
  };
  const handleSaveEditChanges = () => {
    setSelectedUser(null);
    setEditDialogIsOpen(false);
  };
  const handleCancelEditChanges = () => {
    setSelectedUser(null);
    setEditDialogIsOpen(false);
  };
  const handleDeleteClick = (user: UserResponse) => {
    setSelectedUser(user);
    setDeleteDialogIsOpen(true);
  };
  const handleSaveDeleteChanges = () => {
    setSelectedUser(null);
    setDeleteDialogIsOpen(false);
  };
  const handleCancelDeleteChanges = () => {
    setSelectedUser(null);
    setDeleteDialogIsOpen(false);
  };

  const columns: ColumnDef<UserResponse>[] = [
    {
      accessorKey: "accountEnabled",
      header: "status",
      cell: ({ row }) => {
        const isEnabled: boolean = row.getValue("accountEnabled");
        const value = isEnabled ? "enabled" : "disabled";
        return (
          <Badge
            className={`capitalize ${isEnabled ? "bg-green-300" : "bg-red-300"}`}
          >
            {value}
          </Badge>
        );
      },
    },
    {
      accessorKey: "id",
      header: "Id",
      cell: ({ row }) => <div>{row.getValue("id")}</div>,
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("email")}</div>
      ),
      enableHiding: false,
    },
    {
      accessorKey: "username",
      header: "Username",
      cell: ({ row }) => <div>{row.getValue("username")}</div>,
    },
    {
      accessorKey: "roles",
      header: "Roles",
      cell: ({ row }) => {
        const roles = row.getValue("roles") as string[];
        return (
          <div>
            {roles.map((role) => (
              <Badge
                key={role}
                className={`${role === "ROLE_ADMIN" ? "bg-amber-200" : "bg-blue-300"}`}
              >
                {role}
              </Badge>
            ))}
          </div>
        );
      },
    },
    {
      accessorKey: "createdBy",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Created by
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("createdBy") || "-"}</div>,
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Created at
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("createdAt")}</div>,
    },
    {
      accessorKey: "lastUpdatedBy",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Last updated by
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("lastUpdatedBy") || "-"}</div>,
    },
    {
      accessorKey: "updatedAt",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Updated at
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("updatedAt") || "-"}</div>,
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const user = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleEditClick(user)}>
                <Pencil />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDeleteClick(user)}>
                <Trash />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: data?.content ?? [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <div className="flex gap-5">
          <Input
            placeholder="Filter emails..."
            value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("email")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <Button onClick={handleNewUserClick}>
            <Plus />
            New User
          </Button>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {columnIdMapper(column.id)}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => {}}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="py-4">
        <UserTablePagination table={table} />
      </div>
      <NewUserDialog
        newUserDialogIsOpen={NewUserDialogIsOpen}
        onSave={handleSaveNewUserChanges}
        onCancel={handleCancelNewUserChanges}
      />
      <EditUserDialog
        editUserDialogIsOpen={editUserDialogIsOpen}
        user={selectedUser}
        onSave={handleSaveEditChanges}
        onCancel={handleCancelEditChanges}
      />
      <DeleteUserDialog
        deleteUserDialogIsOpen={deleteUserDialogIsOpen}
        user={selectedUser}
        onDelete={handleSaveDeleteChanges}
        onCancel={handleCancelDeleteChanges}
      />
    </div>
  );
}

const columnIdMapper = (columnId: string) => {
  switch (columnId) {
    case "accountEnabled":
      return "Status";
    case "email":
      return "Email";
    case "username":
      return "Username";
    case "roles":
      return "Roles";
    case "createdAt":
      return "Created at";
    case "updatedAt":
      return "Updated at";
    default:
      return columnId;
  }
};
