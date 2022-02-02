import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import Home from './components/Home';
import Test from './components/Test';
import Providers from './providers';

export function Routes() {
    return (
        <>
            <HashRouter basename={'/'}>
                <Providers>
                    <AppLayout>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/test" component={Test} />

                        </Switch>
                    </AppLayout>
                </Providers>
            </HashRouter>
        </>
    );
}
