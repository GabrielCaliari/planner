import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Modal } from "@/components/modal";
import { Participant, ParticipantProps } from "@/components/participant";
import { TripLink, TripLinkProps } from "@/components/tripLink";
import { linksServer } from "@/server/links-server";
import { participantsServer } from "@/server/participants-server";
import { colors } from "@/styles/colors";
import { validateInput } from "@/utils/validateInput";
import { Plus } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, Text, View } from "react-native";
import { set } from "zod";

export const  Details = ({tripId}: {tripId: string}) =>  {
  const [showNewLinkModal, setShowNewLinkModal] = useState(false)
  const [linkName, setLinkName] = useState("")
  const [linkURL, setLinkURL] = useState("")
  const [isCreatingLinkTrip, setIsCreatingLinkTrip] = useState(false)
  const [links, setLinks] = useState<TripLinkProps[]>([])
  const [participants, setParticipants] = useState<ParticipantProps[]>([])

  function resetNewLinkFields(){
    setLinkName("")
    setLinkURL("")
    setShowNewLinkModal(false)
  }

  async function handleCreateLinkTrip() {
    try {
      if(!linkName.trim()){
        return Alert.alert("Link", "Informe um titulo para o link");
      }

      if(!validateInput.url(linkURL.trim())){
        return Alert.alert("Link", "Link invalido!");
      }

      setIsCreatingLinkTrip(true)

      await linksServer.create({
        tripId,
        title: linkName,
        url: linkURL,
      })

      Alert.alert("Link", "Link criado com sucesso!")
      resetNewLinkFields()
      await getTripLinks()
    } catch (error) {

    } finally {
      setIsCreatingLinkTrip(false)
    }
  }

  async function getTripLinks() {
      try {
        const links = await linksServer.getLinksByTripId(tripId)
        setLinks(links)
      } catch (error) {

      }
  }

  async function getTripParticipants() {
    try {
      const participants = await participantsServer.getByTripId(tripId)
      setParticipants(participants)
    } catch (error) {

    }
  }

  useEffect(() => {
    getTripLinks()
    getTripParticipants()
  }, [])

  return (
  <View className="flex-1 mt-10">
    <Text className="text-zinc-50 text-2xl font-semibold mb-2">
      Links importantes:
    </Text>

  <View className="flex-1">
    {links.length > 0 ?  <FlatList
     data={links}
     keyExtractor={(item) => item.id}
     renderItem={({ item }) => <TripLink data={item} />}
     contentContainerClassName="gap-4"
    /> : (
    <Text className="text-zinc-400 font-regular text-base mt-2 mb-6">
      Nenhum link adicionado.
    </Text>)}

    <Button variant="secondary" onPress={() => setShowNewLinkModal(true)}>
      <Plus color={colors.zinc[200]} size={20}/>
      <Button.Title>Cadastrar novo link</Button.Title>
    </Button>
  </View>

  <View className="flex-1 border-t border-zinc-800 mt-6">
   <Text className="text-zinc-50 text-2xl font-semibold my-6">
      Convidados
    </Text>

    <FlatList
      data={participants}
      keyExtractor={(item) => item.id}
      renderItem={({ item}) => <Participant data={item}/>}
      contentContainerClassName="gap-4 pb-44"
    />
  </View>

  <Modal
  title="Cadastrar link"
  subtitle="Todos os convidados podem visualizar os links importantes."
  visible={showNewLinkModal}
  onClose={() => setShowNewLinkModal(false)}>

    <View className="gap-2 mb-3">
      <Input variant="secondary">
        <Input.Field placeholder="Título do link" onChangeText={setLinkName}/>
      </Input>
      <Input variant="secondary">
        <Input.Field placeholder="URL" onChangeText={setLinkURL}/>
      </Input>
    </View>

    <Button isLoading={isCreatingLinkTrip} onPress={handleCreateLinkTrip}>
      <Button.Title>Salvar link</Button.Title>
    </Button>
  </Modal>

  </View>
  )
}

export default Details;
