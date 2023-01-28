import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import tw from 'twrnc';
import { urlFor } from '../sanity';
import Currency from 'react-currency-formatter';
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/solid';
import { useDispatch, useSelector } from 'react-redux';
import { addToBasket, removeFromBasket, selectBasketItems, selectBasketItemsWithId } from '../features/basketSlice';

const DishRow = ({ id, name, description, price, image }) => {
	const [isPressed, setIsPressed] = useState(false);
	const items = useSelector((state) => selectBasketItemsWithId(state, id));
	const dispatch = useDispatch();

	const addItemToBasket = () => {
		dispatch(addToBasket({ id, name, description, price, image }));
	};

	const removeItemFromBasket = () => {
		if (!items.length > 0) return;
		dispatch(removeFromBasket({ id }));
	};

	return (
		<>
			<TouchableOpacity
				onPress={() => setIsPressed(!isPressed)}
				style={tw.style(`bg-white border p-4 border-gray-200`, { borderBottomWidth: isPressed && 0 })}
			>
				<View style={tw`flex-row`}>
					<View style={tw`flex-1 pr-2`}>
						<Text style={tw`text-lg mb-1`}>{name}</Text>
						<Text style={tw`text-gray-400`}>{description}</Text>
						<Text style={tw`text-gray-400 mt-2`}>
							<Currency quantity={price} currency="GBP" />
						</Text>
					</View>

					<View>
						<Image
							source={{ uri: urlFor(image).url() }}
							style={tw.style(`h-20 w-20 bg-gray-300 p-4`, { borderWidth: 1, borderColor: '#F3F3F4' })}
						/>
					</View>
				</View>
			</TouchableOpacity>
			{isPressed && (
				<View style={tw`bg-white px-4`}>
					<View style={tw`flex-row items-center pb-3`}>
						<TouchableOpacity disabled={!items.length} onPress={removeItemFromBasket}>
							<MinusCircleIcon size={40} color={items.length > 0 ? '#00CCBB' : 'gray'} />
						</TouchableOpacity>

						<Text>{items.length}</Text>

						<TouchableOpacity onPress={addItemToBasket}>
							<PlusCircleIcon size={40} color="#00CCBB" />
						</TouchableOpacity>
					</View>
				</View>
			)}
		</>
	);
};

export default DishRow;
