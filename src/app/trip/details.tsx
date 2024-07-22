import React from "react";
import { Text, View } from "react-native";

export const  Details = ({tripId}: {tripId: string}) =>  {
  return (
  <View className="flex-1">
    <Text className="text-white">{tripId}</Text>
  </View>
  )
}

export default Details;
