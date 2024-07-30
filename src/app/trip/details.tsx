import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Modal } from "@/components/modal";
import { linksServer } from "@/server/links-server";
import { colors } from "@/styles/colors";
import { validateInput } from "@/utils/validateInput";
import { Plus } from "lucide-react-native";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";
import { set } from "zod";

export const  Details = ({tripId}: {tripId: string}) =>  {
  const [showNewLinkModal, setShowNewLinkModal] = useState(false)
  const [linkName, setLinkName] = useState("")
  const [linkURL, setLinkURL] = useState("")
  const [isCreatingLinkTrip, setIsCreatingLinkTrip] = useState(false)

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

      if(linkName.trim()){
        return Alert.alert("Link", "Informe um titulo para o link");
      }

      setIsCreatingLinkTrip(true)

      await linksServer.create({
        tripId,
        title: linkName,
        url: linkURL,
      })

      Alert.alert("Link", "Link criado com sucesso!")
      resetNewLinkFields()
    } catch (error) {

    } finally {
      setIsCreatingLinkTrip(false)
    }
  }


  return (
  <View className="flex-1 mt-10">
    <Text className="text-zinc-50 text-2xl font-semibold mb-2">
      Links importantes:
    </Text>

  <View className="flex-1">
    <Button variant="secondary" onPress={() => setShowNewLinkModal(true)}>
      <Plus color={colors.zinc[200]} size={20}/>
      <Button.Title>Cadastrar novo link</Button.Title>
    </Button>
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
