import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Clock, Weight, Trophy, Heart, Users, Target } from "lucide-react"
import { FightResponse } from "@/domains/fight"

interface Fight {
  fightOrder: number
  titleFight?: boolean
  closed?: boolean
  ko?: boolean
  draw?: boolean
  weight: number
  rounds: number
  minutesPerRound: number
  likes?: number
  winnerId?: number
  winnerName?: string
  blueCornerFighterId?: number
  blueCornerFighterName?: string
  blueCornerFighterClub?: string
  redCornerFighterId?: number
  redCornerFighterName?: string
  redCornerFighterClub?: string
  eventId: number
  eventName: string
  category?: string
  categoryId?: number
  style?: string
  styleId?: number
}

// Datos de ejemplo
const fight: Fight = {
  fightOrder: 5,
  titleFight: true,
  closed: true,
  ko: true,
  draw: false,
  weight: 70.5,
  rounds: 5,
  minutesPerRound: 3,
  likes: 142,
  winnerId: 1,
  winnerName: "Juan Pérez",
  blueCornerFighterId: 1,
  blueCornerFighterName: "Juan Pérez",
  blueCornerFighterClub: "Club Tigres",
  redCornerFighterId: 2,
  redCornerFighterName: "Carlos Rodríguez",
  redCornerFighterClub: "Academia León",
  eventId: 1,
  eventName: "Noche de Campeones 2024",
  category: "Peso Welter",
  categoryId: 3,
  style: "Kickboxing",
  styleId: 2,
}

type FightCardDetailsContentPageProps = {
    fight: FightResponse
}


export default function FightCardDetailsContent({fight}: { fight: Fight }) {
  const getResultBadge = () => {
    if (!fight.closed) {
      return <Badge variant="outline">Upcomming</Badge>
    }
    if (fight.draw) {
      return <Badge variant="secondary">Draw</Badge>
    }
    if (fight.ko) {
      return <Badge variant="destructive">KO</Badge>
    }
    return <Badge variant="default">Closed</Badge>
  }

  const getFighterDisplay = (fighterName?: string, fighterClub?: string, isWinner?: boolean) => {
    return (
      <div className={`flex flex-col ${isWinner ? "text-green-600 font-semibold" : ""}`}>
        <span className="text-lg">{fighterName}</span>
        {fighterClub && <span className="text-sm text-muted-foreground">{fighterClub}</span>}
        {isWinner && <Trophy className="h-4 w-4 inline ml-1" />}
      </div>
    )
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <CardTitle className="text-2xl font-bold">
                {fight.blueCornerFighterName} VS {fight.redCornerFighterName}
              </CardTitle>
              {fight.titleFight && (
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                  Tittle fight
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              {getResultBadge()}
              {fight.likes && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Heart className="h-4 w-4" />
                  {fight.likes}
                </div>
              )}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Fighters Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-1">Blue corner</div>
            {getFighterDisplay(
              fight.blueCornerFighterName,
              fight.blueCornerFighterClub,
              fight.winnerId === fight.blueCornerFighterId,
            )}
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-1">Red corner</div>
            {getFighterDisplay(
              fight.redCornerFighterName,
              fight.redCornerFighterClub,
              fight.winnerId === fight.redCornerFighterId,
            )}
          </div>
        </div>

        {/* Winner Section */}
        {fight.closed && fight.winnerName && !fight.draw && (
          <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg border border-green-400">
            <Trophy className="h-5 w-5 text-green-600" />
            <div>
              <p className="font-medium text-green-800">Winner</p>
              <p className="text-sm text-green-700">{fight.winnerName}</p>
            </div>
          </div>
        )}

        {/* Fight Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Event</p>
                <p className="text-sm text-muted-foreground">{fight.eventName}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Order</p>
                <p className="text-sm text-muted-foreground">Fight #{fight.fightOrder}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Weight className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Peso</p>
                <p className="text-sm text-muted-foreground">{fight.weight} kg</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Duration</p>
                <p className="text-sm text-muted-foreground">
                  {fight.rounds} rounds × {fight.minutesPerRound} min
                </p>
              </div>
            </div>

            {fight.category && (
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Category</p>
                  <p className="text-sm text-muted-foreground">{fight.category}</p>
                </div>
              </div>
            )}

            {fight.style && (
              <div className="flex items-start gap-3">
                <Target className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Style</p>
                  <p className="text-sm text-muted-foreground">{fight.style}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
