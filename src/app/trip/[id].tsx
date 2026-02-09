import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Loading } from "@/components/loading";
import { TripDetails } from "@/server/trip-server";
import { colors } from "@/styles/colors";
import dayjs from "dayjs";
import { router, useLocalSearchParams } from "expo-router";
import { CalendarRange, Info, MapPin, Settings2, Calendar as IconCalendar, User } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Alert, Keyboard, Text, TouchableOpacity, View } from "react-native";
import { Activities } from "./activities";
import { Details } from "./details";
import { Modal } from "@/components/modal";
import { Calendar } from "@/components/calendar";
import { DateData } from "react-native-calendars";
import { calendarUtils, DatesSelected } from "@/utils/calendarUtils";
import { validateInput } from "@/utils/validateInput";
import { tripStorage } from "@/storage/trip";
import { getTestTripData, setTestTripData, isTestTripId, addTestParticipant } from "@/storage/testTripData";

export type TripData = TripDetails & {when: string}
enum MODAL {
  NONE = 0,
  UPDATE_TRIP = 1,
  CALENDAR = 2,
  CONFIRM_ATTENDANCE = 3,
}

export default function Trip() {
  const [isLoadingTrip, setIsLoadingTrip] = useState(true)
  const [tripDetails, setTripDetails] = useState({} as TripData)
  const [option, setOption] = useState<"activity" | "details">("activity")
  const [showModal, setShowModal] = useState(MODAL.NONE)
  const [destination, setDestination] = useState("")
  const [selectedDates, setSelectedDates] = useState({} as DatesSelected)
  const [isUpdatingTrip, setIsUpdatingTrip] = useState(false)
  const [guestName, setGuestName] = useState("")
  const [guestEmail, setGuestEmail] = useState("")
  const [isConfirming, setIsConfirming] = useState(false)

  const tripParams = useLocalSearchParams<{id: string, participant?: string}>()

  async function getTripDetails() {
    try {
      setIsLoadingTrip(true)
      if (tripParams.participant) setShowModal(MODAL.CONFIRM_ATTENDANCE)
      if (!tripParams.id) return router.back()

      // App em modo teste: dados só locais, sem servidor
      const saved = await getTestTripData(tripParams.id)
      const mockStarts = saved ? dayjs(saved.starts_at) : dayjs().add(7, "day")
      const mockEnds = saved ? dayjs(saved.ends_at) : dayjs().add(14, "day")
      const dest = saved?.destination ?? "Viagem de teste"
      const maxLen = 14
      const whenText = `${dest.length > maxLen ? dest.slice(0, maxLen) + "..." : dest} de ${mockStarts.format("DD")} a ${mockEnds.format("DD")} de ${mockStarts.format("MMM")}.`
      setDestination(dest)
      setTripDetails({
        id: tripParams.id,
        destination: dest,
        starts_at: mockStarts.toString(),
        ends_at: mockEnds.toString(),
        is_confirmed: false,
        when: whenText,
      })
      const startData: DateData = { dateString: mockStarts.format("YYYY-MM-DD"), day: mockStarts.date(), month: mockStarts.month() + 1, year: mockStarts.year(), timestamp: mockStarts.valueOf() }
      const endData: DateData = { dateString: mockEnds.format("YYYY-MM-DD"), day: mockEnds.date(), month: mockEnds.month() + 1, year: mockEnds.year(), timestamp: mockEnds.valueOf() }
      const first = calendarUtils.orderStartsAtAndEndsAt({ selectedDay: startData, startsAt: undefined, endsAt: undefined })
      setSelectedDates(calendarUtils.orderStartsAtAndEndsAt({ ...first, selectedDay: endData }))
    } catch {
      // fallback mock
      const mockStarts = dayjs().add(7, "day")
      const mockEnds = dayjs().add(14, "day")
      setDestination("Viagem de teste")
      setTripDetails({
        id: tripParams.id,
        destination: "Viagem de teste",
        starts_at: mockStarts.toString(),
        ends_at: mockEnds.toString(),
        is_confirmed: false,
        when: `Viagem de teste de ${mockStarts.format("DD")} a ${mockEnds.format("DD")} de ${mockStarts.format("MMM")}.`,
      })
    } finally {
      setIsLoadingTrip(false)
    }
  }

  async function handleUpdateTrip() {
    if (!tripParams.id) return
    if (!destination || !selectedDates.startsAt || !selectedDates.endsAt) {
      return Alert.alert("Atualizar viagem", "Lembre-se de, além de preencher o destino, selecione data de início e fim da viagem")
    }
    try {
      setIsUpdatingTrip(true)
      if (isTestTripId(tripParams.id)) {
        await setTestTripData(tripParams.id, {
          destination,
          starts_at: dayjs(selectedDates.startsAt.dateString).toString(),
          ends_at: dayjs(selectedDates.endsAt.dateString).toString(),
        })
        const whenText = `${destination.length > 14 ? destination.slice(0, 14) + "..." : destination} de ${dayjs(selectedDates.startsAt.dateString).format("DD")} a ${dayjs(selectedDates.endsAt.dateString).format("DD")} de ${dayjs(selectedDates.startsAt.dateString).format("MMM")}.`
        setTripDetails((prev) => ({ ...prev, destination, when: whenText, starts_at: dayjs(selectedDates.startsAt!.dateString).toString(), ends_at: dayjs(selectedDates.endsAt!.dateString).toString() }))
      }
      Alert.alert("Atualizar viagem", "Viagem atualizada com sucesso!", [
        { text: "OK", onPress: () => { setShowModal(MODAL.NONE); getTripDetails() } },
      ])
    } catch {
      Alert.alert("Atualizar viagem", "Não foi possível atualizar.")
    } finally {
      setIsUpdatingTrip(false)
    }
  }

  async function handleConfirm() {
    if (!tripParams.id || !guestName.trim() || !guestEmail.trim()) {
      if (!guestName.trim() || !guestEmail.trim()) return Alert.alert("Confirmação", "Preencha nome e e-mail para confirmar a viagem!")
      return
    }
    if (!validateInput.email(guestEmail.trim())) return Alert.alert("Confirmação", "E-mail invalido")
    try {
      setIsConfirming(true)
      if (isTestTripId(tripParams.id)) {
        await addTestParticipant(tripParams.id, { name: guestName.trim(), email: guestEmail.trim(), is_confirmed: true })
        await tripStorage.save(tripParams.id)
        Alert.alert("Confirmação", "Viagem confirmada com sucesso!")
        setShowModal(MODAL.NONE)
      }
    } catch {
      Alert.alert("Confirmação", "Não foi possivel confirmar!")
    } finally {
      setIsConfirming(false)
    }
  }

  async function handleRemoveTrip() {
    try {
      Alert.alert("Remover viagem", "Tem certeza que deseja remover a viagem", [
        {
          text: "Não",
          style: "cancel"
        },
        {
          text: "Sim",
          onPress: async () => {
            await tripStorage.remove()
            router.navigate("/")
          }
        }
      ])
    } catch (error) {

    }
  }

  useEffect(() => {
    getTripDetails()
  }, [])

  if (isLoadingTrip)  {
    return <Loading />
  }

  function handleSelectDate(selectedDay: DateData) {
    const dates = calendarUtils.orderStartsAtAndEndsAt({
      startsAt: selectedDates.startsAt,
      endsAt: selectedDates.endsAt,
      selectedDay,
    })
    setSelectedDates(dates)
  }

  return (
  <View className="flex-1 px-5 pt-16">
    <Input variant="tertiary">
      <MapPin color={colors.zinc[400]} size={20} />
      <Input.Field value={tripDetails.when} readOnly />
      <TouchableOpacity
      activeOpacity={0.6}
      className="w-9 h-9 bg-zinc-800 items-center justify-center rounded"
      onPress={() => setShowModal(MODAL.UPDATE_TRIP)}
      >
        <Settings2 color={colors.zinc[400]} size={20}/>
      </TouchableOpacity>
    </Input>
    {
      option === "activity" ? <Activities tripDetails={tripDetails}/> : <Details tripId={tripDetails.id}/>
    }
    <View className="w-full absolute -bottom-1 self-center justify-end pb-5 z-10 bg-zinc-950">
        <View className="w-full flex-row bg-zinc-900 p-4 rounded-lg border border-zinc-800  gap-2">
            <Button className="flex-1 w-48" onPress={() => setOption("activity")}
              variant={option === "activity" ? "primary" : "secondary"}>
              <CalendarRange color={
                option === "activity" ? colors.lime[950] : colors.zinc[200]
              } size={20}/>
              <Button.Title>Atividades</Button.Title>
            </Button>
            <Button className="flex-1 w-44 " onPress={() => setOption("details")}
              variant={option === "details" ? "primary" : "secondary"}>
              <Info color={
                option === "details" ? colors.lime[950] : colors.zinc[200]
              } size={20}/>
              <Button.Title>Detalhes</Button.Title>
            </Button>
        </View>
    </View>

    <Modal
    title="Atualizar viagem"
    subtitle="Somente quem criou a viagem pode editar."
    visible={showModal === MODAL.UPDATE_TRIP}
    onClose={() => setShowModal(MODAL.NONE)}
    >
      <View className="gap-2 my-4">
          <Input variant="secondary">
            <MapPin color={colors.zinc[400]} size={20}/>
            <Input.Field placeholder="Para onde?" onChangeText={setDestination} value={destination}/>
          </Input>
          <Input variant="secondary">
            <IconCalendar color={colors.zinc[400]} size={20}/>
            <Input.Field
            placeholder="Quando?"
            value={selectedDates.formatDatesInText}
            onPressIn={() => setShowModal(MODAL.CALENDAR)}
            onFocus={() => Keyboard.dismiss()}
            />
          </Input>

          <Button onPress={handleUpdateTrip} isLoading={isUpdatingTrip}>
            <Button.Title>Atualizar</Button.Title>
          </Button>

          <TouchableOpacity activeOpacity={0.8} onPress={handleRemoveTrip}>
            <Text className="text-red-400 text-center mt-6">Remover viagem</Text>
          </TouchableOpacity>
      </View>
    </Modal>

    <Modal
          title="Selecionar datas"
          subtitle="Selecione a data de ida e volta da viagem"
          visible={showModal === MODAL.CALENDAR}
          onClose={() =>setShowModal(MODAL.NONE)}
          >
          <View className=' gap-4 mt-4'>
            <Calendar
              minDate={dayjs().toISOString()}
              onDayPress={handleSelectDate}
              markedDates={selectedDates.dates}
            />
            <Button onPress={() => setShowModal(MODAL.UPDATE_TRIP)}>
              <Button.Title>Confirmar</Button.Title>
            </Button>
          </View>

    </Modal>

    <Modal title="Confirmar presença" visible={showModal === MODAL.CONFIRM_ATTENDANCE} >
        <View className="gap-4 mt-4">
          <Text className="text-zinc-400 font-regular leading-6 my-2">
              Você foi convidado (a) para participar de uma viagem para
            <Text className="font-semibold text-zinc-100"> {""} {tripDetails.destination}{" "}</Text>
            <Text>nas datas de {""}</Text>
            <Text className="font-semibold text-zinc-100">
              {dayjs(tripDetails.starts_at).date()} a
              {" "}
              {dayjs(tripDetails.ends_at).date()} de {" "}
              {dayjs(tripDetails.ends_at).format("MMMM")}. {"\n\n"}
            </Text>
              Para confirmar sua presença na viagem, preencha os dados abaixo:
          </Text>

          <Input variant="secondary">
              <User color={colors.zinc[400]} size={20}/>
              <Input.Field placeholder="Seu nome completo" onChangeText={setGuestName}/>
          </Input>

          <Input variant="secondary">
              <User color={colors.zinc[400]} size={20}/>
              <Input.Field placeholder="Email de confirmação" onChangeText={setGuestEmail}/>
          </Input>

          <Button isLoading={isConfirming} onPress={handleConfirm}>
            <Button.Title>Confirmar minha presença</Button.Title>
          </Button>

        </View>
    </Modal>

  </View>
  )
}
