import { BicepsFlexed, Skull, Swords, Trophy } from "lucide-react"
import { Badge } from "../ui/badge"
import { Label } from "@radix-ui/react-dropdown-menu"
import { Card, CardContent } from "../ui/card"

export default function ProfileMasonry() {
    return (
        <div className="grid grid-rows-2 gap-7">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="col-span-2 flex flex-col gap-2">
                    <h2 className="text-2xl font-bold">Record</h2>
                    <Card>
                        <CardContent className="flex justify-around items-center space-x-4">
                            <div className="flex flex-col items-center gap-2">
                                <Trophy className="w-10 h-10" />
                                <div className="grid items-center grid-rows-2">
                                    <Label className="text-xl">Wins</Label>
                                    <p className="text-3xl font-extrabold text-center">2</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <Skull className="w-10 h-10" />
                                <div className="grid items-center grid-rows-2">
                                    <Label className="text-xl">Losses</Label>
                                    <p className="text-3xl font-extrabold text-center">2</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <Swords className="w-10 h-10" />
                                <div className="grid items-center grid-rows-2">
                                    <Label className="text-xl">Draws</Label>
                                    <p className="text-3xl font-extrabold text-center">2</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="col-span-1 flex flex-col gap-2">
                    <h2 className="text-2xl font-bold">Ko's</h2>
                    <Card>
                        <CardContent className="flex justify-center items-center space-x-4">
                            <div className="flex flex-col items-center gap-2">
                                <BicepsFlexed className="w-10 h-10" />
                                <div className="grid items-center grid-rows-2">
                                    <Label className="text-xl">Ko's</Label>
                                    <p className="text-3xl font-extrabold text-center">2</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold">Styles</h2>
                <Card>
                    <CardContent className="flex items-center space-x-4">
                        <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-sm">Muay Thai</Badge>
                            <Badge variant="secondary" className="text-sm">Boxing</Badge>
                            <Badge variant="secondary" className="text-sm">MMA</Badge>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}