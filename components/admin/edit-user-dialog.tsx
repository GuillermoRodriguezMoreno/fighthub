import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { UserResponse } from "@/domains/user"
import { UseGetRolesQuery } from "@/hooks/role/use-get-roles-query"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

export type EditUserDialogProps = {
  user: UserResponse | null
  onSave: (user: UserResponse) => void
  onCancel: () => void
}

export function EditUserDialog({ user, onCancel, onSave }: EditUserDialogProps) {
  const roles = UseGetRolesQuery()
  const handleSave = () => {
    if (user)
      onSave(user);
  }
  return (
    <Dialog open={!!user}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader >
          <DialogTitle>Edit user</DialogTitle>
          <DialogDescription>
            Make changes to user here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="name" value={user?.username} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input id="email" value={user?.email} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="newPassword">
              New password
            </Label>
            <Input id="newPassword" type="password" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="repeatPassword">
              Repeat password
            </Label>
            <Input id="repeatPassword" type="password" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="role" className="text-right">
              Role
            </Label>
            <div className="col-span-3">
            <RoleSelect userRoles={user?.roles} />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="accountEnabled">
              Account enabled
            </Label>
            <div className="col-span-3">

            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={user?.accountEnabled} />
              </SelectTrigger>
              <SelectContent>
                  <SelectItem value="true">
                    True
                  </SelectItem>
                  <SelectItem value="false">
                    False
                  </SelectItem>
              </SelectContent>
            </Select>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="accountLocked">
              Account locked
            </Label>
            <div className="col-span-3">

            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={user?.accountLocked} />
              </SelectTrigger>
              <SelectContent>
                  <SelectItem value="true">
                    True
                  </SelectItem>
                  <SelectItem value="false">
                    False
                  </SelectItem>
              </SelectContent>
            </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

interface RoleSelectProps {
  userRoles: string[] | undefined
}

export function RoleSelect({ userRoles }: RoleSelectProps) {
  const rolesQuery = UseGetRolesQuery()
  const roles = rolesQuery.data?.content || []
  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={userRoles?.[0] || "Select a role"} />
      </SelectTrigger>
      <SelectContent>
        {roles.map((role) => (
          <SelectItem key={role.id} value={role.name}>
            {role.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>

  )
}