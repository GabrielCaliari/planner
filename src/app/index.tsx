 import { Input } from "@/components/input";
import { Image, Text, View} from "react-native";
 export default function Index(){
    return (
      <View className="flex-1 items-center justify-center">
        <Image source={require("@/assets/logo.png")} className="h-8" resizeMode="contain"/>
        <Text className="text-zinc-400 font-regular text-center text-lg mt-3">
          Convide seus amigos e planeje sua{"\n"}próxima viagem
        </Text>
        <View>
          <Input variant="primary">
            <Input.Field />
          </Input>
        </View>
      </View>
    )
  }
