import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import '@vkontakte/vkui/dist/vkui.css';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import Epic from '@vkontakte/vkui/dist/components/Epic/Epic';
import Tabbar from '@vkontakte/vkui/dist/components/Tabbar/Tabbar';
import TabbarItem from '@vkontakte/vkui/dist/components/TabbarItem/TabbarItem';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Icon28SearchOutline from '@vkontakte/icons/dist/28/search_outline';
import Icon28AddCircleOutline from '@vkontakte/icons/dist/28/add_circle_outline';
import Icon28Users3Outline from '@vkontakte/icons/dist/28/users_3_outline';

const ROUTES = {
	FIND: 'find',
	CREATE: 'create',
	CHECK_PAGE: 'check_page'
};

const App = () => {
	const [activeView, setActiveView] = useState(ROUTES.FIND);
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			setUser(user);
			setPopout(null);
		}
		fetchData();
	}, []);



	return (
		<Epic tabbar={
			<Tabbar>
				<TabbarItem
					onClick={() => setActiveView(ROUTES.FIND)}
					selected={activeView === ROUTES.FIND}
					data-story={ROUTES.FIND}
				><Icon28SearchOutline /></TabbarItem>
				<TabbarItem
					onClick={() => setActiveView(ROUTES.CREATE)}
					selected={activeView === ROUTES.CREATE}
					data-story={ROUTES.CREATE}
				><Icon28AddCircleOutline/></TabbarItem>
				<TabbarItem
					onClick={() => setActiveView(ROUTES.CHECK_PAGE)}
					selected={activeView === ROUTES.CHECK_PAGE}
					data-story={ROUTES.CHECK_PAGE}
				><Icon28Users3Outline /></TabbarItem>
			</Tabbar>
		} activeStory={activeView}>
			<View id={ROUTES.FIND} activePanel={ROUTES.FIND}>
				<Panel id={ROUTES.FIND}>
					<PanelHeader>Найти</PanelHeader>
				</Panel>
			</View>
			<View id={ROUTES.CREATE} activePanel={ROUTES.CREATE}>
				<Panel id={ROUTES.CREATE}>
					<PanelHeader>Создать заявку</PanelHeader>
				</Panel>
			</View>
			<View id={ROUTES.CHECK_PAGE} activePanel={ROUTES.CHECK_PAGE}>
				<Panel id={ROUTES.CHECK_PAGE}>
					<PanelHeader>Ваша заявка</PanelHeader>
				</Panel>
			</View>
		</Epic>
	);
}

export default App;

