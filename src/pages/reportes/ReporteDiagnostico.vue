<template>
    <v-row>
        <v-dialog v-model="dialogProcesando" persistent width="500">
            <v-card color="primary" dark>
                <v-card-text>
                    <br/> 
                    {{dialogMensaje}}
                    <br/><br/>
                    <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-col cols="12" class="py-0">
            <titulo-principal-cx :titulo="titulo" />
        </v-col>
        <v-col cols="12" class="py-0">

            <v-stepper v-model="step">
                <v-stepper-header>
                <v-stepper-step :complete="step > 1" step="1">
                    Generar Datos
                </v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step :complete="step > 2" step="2">
                    Generar PDF
                </v-stepper-step>
                </v-stepper-header>

                <v-stepper-items>
                <v-stepper-content step="1">
                    <form-cx action="#" :method="method" :data="data" @requeststarted="requeststarted" :url="url" @success="success" @error="error">
                        <v-row>
                            <v-col cols="12" lg="4"></v-col>
                            <v-col cols="12" lg="4">
                                <v-select
                                :items="tests"
                                :rules="rules.tests.rule"
                                v-model="data._id_test"
                                label="Evaluación a generar"
                                required
                                ></v-select>
                            </v-col>
                            <v-col cols="12" lg="4"></v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" lg="6" class="text-center">
                                <v-simple-table dense>
                                    <template v-slot:default>
                                        <thead>
                                            <tr>
                                                <th colspan="4" class="text-center">
                                                    Motivación general
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td class="text-right"><v-avatar tile :color="data.motivacion_general.satisfactorio.color" size="35"></v-avatar></td>
                                                <td class="text-left">ALTO</td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.motivacion_general.satisfactorio.desde" label="Desde"></v-text-field>
                                                </td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.motivacion_general.satisfactorio.hasta" label="Hasta"></v-text-field>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="text-right"><v-avatar tile :color="data.motivacion_general.intermedio.color" size="35"></v-avatar></td>
                                                <td class="text-left">MEDIO</td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.motivacion_general.intermedio.desde" label="Desde"></v-text-field>
                                                </td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.motivacion_general.intermedio.hasta" label="Hasta"></v-text-field>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="text-right"><v-avatar tile :color="data.motivacion_general.bajo.color" size="35"></v-avatar></td>
                                                <td class="text-left">BAJO</td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.motivacion_general.bajo.desde" label="Desde"></v-text-field>
                                                </td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.motivacion_general.bajo.hasta" label="Hasta"></v-text-field>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </template>
                                </v-simple-table>
                            </v-col>
                            <v-col cols="12" lg="6" class="text-center">
                                <v-simple-table dense>
                                    <template v-slot:default>
                                        <thead>
                                            <tr>
                                                <th colspan="4" class="text-center">
                                                    Perfil Motivacional Individual
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td class="text-right"><v-avatar tile :color="data.perfil_motivacional_individual.satisfactorio.color" size="35"></v-avatar></td>
                                                <td class="text-left">ALTO</td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.perfil_motivacional_individual.satisfactorio.desde" label="Desde"></v-text-field>
                                                </td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.perfil_motivacional_individual.satisfactorio.hasta" label="Hasta"></v-text-field>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="text-right"><v-avatar tile :color="data.perfil_motivacional_individual.intermedio.color" size="35"></v-avatar></td>
                                                <td class="text-left">MEDIO</td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.perfil_motivacional_individual.intermedio.desde" label="Desde"></v-text-field>
                                                </td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.perfil_motivacional_individual.intermedio.hasta" label="Hasta"></v-text-field>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="text-right"><v-avatar tile :color="data.perfil_motivacional_individual.bajo.color" size="35"></v-avatar></td>
                                                <td class="text-left">BAJO</td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.perfil_motivacional_individual.bajo.desde" label="Desde"></v-text-field>
                                                </td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.perfil_motivacional_individual.bajo.hasta" label="Hasta"></v-text-field>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </template>
                                </v-simple-table>
                            </v-col>
                            <v-col cols="12" class="text-center">
                                <h2>Factores Higiénicos</h2>
                            </v-col>
                            <v-col cols="12" lg="6" class="text-center">
                                <v-simple-table dense>
                                    <template v-slot:default>
                                        <thead>
                                            <tr>
                                                <th colspan="4" class="text-center">
                                                    Estatus
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td class="text-right"><v-avatar tile :color="data.factores_higienicos_individual.estatus.satisfactorio.color" size="35"></v-avatar></td>
                                                <td class="text-left">ALTO</td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.factores_higienicos_individual.estatus.satisfactorio.desde" label="Desde"></v-text-field>
                                                </td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.factores_higienicos_individual.estatus.satisfactorio.hasta" label="Hasta"></v-text-field>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="text-right"><v-avatar tile :color="data.factores_higienicos_individual.estatus.intermedio.color" size="35"></v-avatar></td>
                                                <td class="text-left">MEDIO</td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.factores_higienicos_individual.estatus.intermedio.desde" label="Desde"></v-text-field>
                                                </td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.factores_higienicos_individual.estatus.intermedio.hasta" label="Hasta"></v-text-field>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="text-right"><v-avatar tile :color="data.factores_higienicos_individual.estatus.bajo.color" size="35"></v-avatar></td>
                                                <td class="text-left">BAJO</td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.factores_higienicos_individual.estatus.bajo.desde" label="Desde"></v-text-field>
                                                </td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.factores_higienicos_individual.estatus.bajo.hasta" label="Hasta"></v-text-field>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </template>
                                </v-simple-table>
                            </v-col>
                            <v-col cols="12" lg="6" class="text-center">
                                <v-simple-table dense>
                                    <template v-slot:default>
                                        <thead>
                                            <tr>
                                                <th colspan="4" class="text-center">
                                                    Relaciones con superiores
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td class="text-right"><v-avatar tile :color="data.factores_higienicos_individual.relaciones_superiores.satisfactorio.color" size="35"></v-avatar></td>
                                                <td class="text-left">ALTO</td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.factores_higienicos_individual.relaciones_superiores.satisfactorio.desde" label="Desde"></v-text-field>
                                                </td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.factores_higienicos_individual.relaciones_superiores.satisfactorio.hasta" label="Hasta"></v-text-field>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="text-right"><v-avatar tile :color="data.factores_higienicos_individual.relaciones_superiores.intermedio.color" size="35"></v-avatar></td>
                                                <td class="text-left">MEDIO</td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.factores_higienicos_individual.relaciones_superiores.intermedio.desde" label="Desde"></v-text-field>
                                                </td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.factores_higienicos_individual.relaciones_superiores.intermedio.hasta" label="Hasta"></v-text-field>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="text-right"><v-avatar tile :color="data.factores_higienicos_individual.relaciones_superiores.bajo.color" size="35"></v-avatar></td>
                                                <td class="text-left">BAJO</td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.factores_higienicos_individual.relaciones_superiores.bajo.desde" label="Desde"></v-text-field>
                                                </td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.factores_higienicos_individual.relaciones_superiores.bajo.hasta" label="Hasta"></v-text-field>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </template>
                                </v-simple-table>
                            </v-col>
                            <v-col cols="12" lg="6" class="text-center">
                                <v-simple-table dense>
                                    <template v-slot:default>
                                        <thead>
                                            <tr>
                                                <th colspan="4" class="text-center">
                                                    Relaciones laborales
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td class="text-right"><v-avatar tile :color="data.factores_higienicos_individual.relaciones_laborales.satisfactorio.color" size="35"></v-avatar></td>
                                                <td class="text-left">ALTO</td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.factores_higienicos_individual.relaciones_laborales.satisfactorio.desde" label="Desde"></v-text-field>
                                                </td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.factores_higienicos_individual.relaciones_laborales.satisfactorio.hasta" label="Hasta"></v-text-field>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="text-right"><v-avatar tile :color="data.factores_higienicos_individual.relaciones_laborales.intermedio.color" size="35"></v-avatar></td>
                                                <td class="text-left">MEDIO</td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.factores_higienicos_individual.relaciones_laborales.intermedio.desde" label="Desde"></v-text-field>
                                                </td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.factores_higienicos_individual.relaciones_laborales.intermedio.hasta" label="Hasta"></v-text-field>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="text-right"><v-avatar tile :color="data.factores_higienicos_individual.relaciones_laborales.bajo.color" size="35"></v-avatar></td>
                                                <td class="text-left">BAJO</td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.factores_higienicos_individual.relaciones_laborales.bajo.desde" label="Desde"></v-text-field>
                                                </td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.factores_higienicos_individual.relaciones_laborales.bajo.hasta" label="Hasta"></v-text-field>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </template>
                                </v-simple-table>
                            </v-col>
                            <v-col cols="12" lg="6" class="text-center">
                                <v-simple-table dense>
                                    <template v-slot:default>
                                        <thead>
                                            <tr>
                                                <th colspan="4" class="text-center">
                                                    Políticas de la Empresa
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td class="text-right"><v-avatar tile :color="data.factores_higienicos_individual.politicas_empresa.satisfactorio.color" size="35"></v-avatar></td>
                                                <td class="text-left">ALTO</td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.factores_higienicos_individual.politicas_empresa.satisfactorio.desde" label="Desde"></v-text-field>
                                                </td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.factores_higienicos_individual.politicas_empresa.satisfactorio.hasta" label="Hasta"></v-text-field>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="text-right"><v-avatar tile :color="data.factores_higienicos_individual.politicas_empresa.intermedio.color" size="35"></v-avatar></td>
                                                <td class="text-left">MEDIO</td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.factores_higienicos_individual.politicas_empresa.intermedio.desde" label="Desde"></v-text-field>
                                                </td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.factores_higienicos_individual.politicas_empresa.intermedio.hasta" label="Hasta"></v-text-field>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="text-right"><v-avatar tile :color="data.factores_higienicos_individual.politicas_empresa.bajo.color" size="35"></v-avatar></td>
                                                <td class="text-left">BAJO</td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.factores_higienicos_individual.politicas_empresa.bajo.desde" label="Desde"></v-text-field>
                                                </td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.factores_higienicos_individual.politicas_empresa.bajo.hasta" label="Hasta"></v-text-field>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </template>
                                </v-simple-table>
                            </v-col>
                            <v-col cols="12" lg="6" class="text-center">
                                <v-simple-table dense>
                                    <template v-slot:default>
                                        <thead>
                                            <tr>
                                                <th colspan="4" class="text-center">
                                                    Condiciones de trabajo
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td class="text-right"><v-avatar tile :color="data.factores_higienicos_individual.condiciones_trabajo.satisfactorio.color" size="35"></v-avatar></td>
                                                <td class="text-left">ALTO</td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.factores_higienicos_individual.condiciones_trabajo.satisfactorio.desde" label="Desde"></v-text-field>
                                                </td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.factores_higienicos_individual.condiciones_trabajo.satisfactorio.hasta" label="Hasta"></v-text-field>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="text-right"><v-avatar tile :color="data.factores_higienicos_individual.condiciones_trabajo.intermedio.color" size="35"></v-avatar></td>
                                                <td class="text-left">MEDIO</td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.factores_higienicos_individual.condiciones_trabajo.intermedio.desde" label="Desde"></v-text-field>
                                                </td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.factores_higienicos_individual.condiciones_trabajo.intermedio.hasta" label="Hasta"></v-text-field>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="text-right"><v-avatar tile :color="data.factores_higienicos_individual.condiciones_trabajo.bajo.color" size="35"></v-avatar></td>
                                                <td class="text-left">BAJO</td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.factores_higienicos_individual.condiciones_trabajo.bajo.desde" label="Desde"></v-text-field>
                                                </td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.factores_higienicos_individual.condiciones_trabajo.bajo.hasta" label="Hasta"></v-text-field>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </template>
                                </v-simple-table>
                            </v-col>
                            <v-col cols="12" class="text-center">
                                <h2>Factores Motivacionales</h2>
                            </v-col>
                            <v-col cols="12" lg="6" class="text-center">
                                <v-simple-table dense>
                                    <template v-slot:default>
                                        <thead>
                                            <tr>
                                                <th colspan="4" class="text-center">
                                                    Autorrealización / Reconocimientos
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td class="text-right"><v-avatar tile :color="data.factores_motivacionales_individual.autorrealizacion.satisfactorio.color" size="35"></v-avatar></td>
                                                <td class="text-left">ALTO</td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.factores_motivacionales_individual.autorrealizacion.satisfactorio.desde" label="Desde"></v-text-field>
                                                </td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.factores_motivacionales_individual.autorrealizacion.satisfactorio.hasta" label="Hasta"></v-text-field>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="text-right"><v-avatar tile :color="data.factores_motivacionales_individual.autorrealizacion.intermedio.color" size="35"></v-avatar></td>
                                                <td class="text-left">MEDIO</td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.factores_motivacionales_individual.autorrealizacion.intermedio.desde" label="Desde"></v-text-field>
                                                </td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.factores_motivacionales_individual.autorrealizacion.intermedio.hasta" label="Hasta"></v-text-field>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="text-right"><v-avatar tile :color="data.factores_motivacionales_individual.autorrealizacion.bajo.color" size="35"></v-avatar></td>
                                                <td class="text-left">BAJO</td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.factores_motivacionales_individual.autorrealizacion.bajo.desde" label="Desde"></v-text-field>
                                                </td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.factores_motivacionales_individual.autorrealizacion.bajo.hasta" label="Hasta"></v-text-field>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </template>
                                </v-simple-table>
                            </v-col>
                            <v-col cols="12" lg="6" class="text-center">
                                <v-simple-table dense>
                                    <template v-slot:default>
                                        <thead>
                                            <tr>
                                                <th colspan="4" class="text-center">
                                                    Tareas
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td class="text-right"><v-avatar tile :color="data.factores_motivacionales_individual.tareas.satisfactorio.color" size="35"></v-avatar></td>
                                                <td class="text-left">ALTO</td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.factores_motivacionales_individual.tareas.satisfactorio.desde" label="Desde"></v-text-field>
                                                </td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.factores_motivacionales_individual.tareas.satisfactorio.hasta" label="Hasta"></v-text-field>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="text-right"><v-avatar tile :color="data.factores_motivacionales_individual.tareas.intermedio.color" size="35"></v-avatar></td>
                                                <td class="text-left">MEDIO</td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.factores_motivacionales_individual.tareas.intermedio.desde" label="Desde"></v-text-field>
                                                </td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.factores_motivacionales_individual.tareas.intermedio.hasta" label="Hasta"></v-text-field>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="text-right"><v-avatar tile :color="data.factores_motivacionales_individual.tareas.bajo.color" size="35"></v-avatar></td>
                                                <td class="text-left">BAJO</td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.factores_motivacionales_individual.tareas.bajo.desde" label="Desde"></v-text-field>
                                                </td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.factores_motivacionales_individual.tareas.bajo.hasta" label="Hasta"></v-text-field>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </template>
                                </v-simple-table>
                            </v-col>
                            <v-col cols="12" lg="6" class="text-center">
                                <v-simple-table dense>
                                    <template v-slot:default>
                                        <thead>
                                            <tr>
                                                <th colspan="4" class="text-center">
                                                    Crecimiento
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td class="text-right"><v-avatar tile :color="data.factores_motivacionales_individual.crecimiento.satisfactorio.color" size="35"></v-avatar></td>
                                                <td class="text-left">ALTO</td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.factores_motivacionales_individual.crecimiento.satisfactorio.desde" label="Desde"></v-text-field>
                                                </td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.factores_motivacionales_individual.crecimiento.satisfactorio.hasta" label="Hasta"></v-text-field>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="text-right"><v-avatar tile :color="data.factores_motivacionales_individual.crecimiento.intermedio.color" size="35"></v-avatar></td>
                                                <td class="text-left">MEDIO</td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.factores_motivacionales_individual.crecimiento.intermedio.desde" label="Desde"></v-text-field>
                                                </td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.factores_motivacionales_individual.crecimiento.intermedio.hasta" label="Hasta"></v-text-field>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="text-right"><v-avatar tile :color="data.factores_motivacionales_individual.crecimiento.bajo.color" size="35"></v-avatar></td>
                                                <td class="text-left">BAJO</td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.factores_motivacionales_individual.crecimiento.bajo.desde" label="Desde"></v-text-field>
                                                </td>
                                                <td>
                                                    <v-text-field type="number" step="0.01" v-model="data.factores_motivacionales_individual.crecimiento.bajo.hasta" label="Hasta"></v-text-field>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </template>
                                </v-simple-table>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                <submit-cx :disabled="!data._id_test">Generar</submit-cx>
                            </v-col>
                        </v-row>
                    </form-cx>
                </v-stepper-content>

                <v-stepper-content step="2">
                    <form-cx action="#" :method="method" :data="dataParaPdf" @requeststarted="requeststarted" :url="urlPdf" @success="successPdf" @error="error">
                        <v-row>
                            <v-col cols="12">
                                <highcharts :options="chartOptionsGenero"></highcharts>
                            </v-col>
                            <v-col cols="12">
                                <highcharts :options="chartOptionsAntiguedad"></highcharts>
                            </v-col>
                            <v-col cols="12">
                                <highcharts :options="chartOptionsAreas"></highcharts>
                            </v-col>
                            <v-col cols="6">
                                <v-card
                                    class="mx-auto"
                                    max-width="400"
                                >
                                    <v-list-item two-line>
                                    <v-list-item-content>
                                        <v-list-item-title class="headline">
                                        Resumen General
                                        </v-list-item-title>
                                        <v-list-item-subtitle>Promedio de la Compañía</v-list-item-subtitle>
                                    </v-list-item-content>
                                    </v-list-item>

                                    <v-card-text>
                                    <v-row align="center">
                                        <v-col
                                        class="display-2"
                                        cols="6"
                                        >
                                        {{promedioGeneral.porcentaje}} %
                                        </v-col>
                                        <v-col cols="6" class="display-1">
                                            {{promedioGeneral.label}}
                                        </v-col>
                                    </v-row>
                                    </v-card-text>    
                                </v-card>
                            </v-col>
                            <v-col cols="6">
                                <v-simple-table dense>
                                    <template v-slot:default>
                                        <thead>
                                            <tr>
                                                <th colspan="4" class="text-center">
                                                    Motivación general
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td class="text-right"><v-avatar tile :color="data.motivacion_general.satisfactorio.color" size="35"></v-avatar></td>
                                                <td class="text-left">ALTO</td>
                                                <td>
                                                    <v-text-field type="number" readonly step="0.01" v-model="data.motivacion_general.satisfactorio.desde" label="Desde"></v-text-field>
                                                </td>
                                                <td>
                                                    <v-text-field type="number" readonly step="0.01" v-model="data.motivacion_general.satisfactorio.hasta" label="Hasta"></v-text-field>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="text-right"><v-avatar tile :color="data.motivacion_general.intermedio.color" size="35"></v-avatar></td>
                                                <td class="text-left">MEDIO</td>
                                                <td>
                                                    <v-text-field type="number" readonly step="0.01" v-model="data.motivacion_general.intermedio.desde" label="Desde"></v-text-field>
                                                </td>
                                                <td>
                                                    <v-text-field type="number" readonly step="0.01" v-model="data.motivacion_general.intermedio.hasta" label="Hasta"></v-text-field>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="text-right"><v-avatar tile :color="data.motivacion_general.bajo.color" size="35"></v-avatar></td>
                                                <td class="text-left">BAJO</td>
                                                <td>
                                                    <v-text-field type="number" readonly step="0.01" v-model="data.motivacion_general.bajo.desde" label="Desde"></v-text-field>
                                                </td>
                                                <td>
                                                    <v-text-field type="number" readonly step="0.01" v-model="data.motivacion_general.bajo.hasta" label="Hasta"></v-text-field>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </template>
                                </v-simple-table>
                            </v-col>
                            <v-col cols="12">
                                <highcharts :options="chartOptionsPromedioPorAreas"></highcharts>
                            </v-col>
                            <v-col cols="12">
                                <highcharts :options="chartOptionsPromedioPorGenero"></highcharts>
                            </v-col>
                            <v-col cols="12">
                                <highcharts :options="chartOptionsPromedioPorAntiguedad"></highcharts>
                            </v-col>
                            <!--<v-col cols="12" v-for="(dimension) in dataIndividualArea" :key="dimension.area">
                                <resumen-individual-area  
                                :area="dimension.area"
                                :usuarios="dimension.usuarios" />
                            </v-col>-->
                            <v-col cols="12"><h2>Incentivos, Motivaciones y Desmotivaciones: </h2></v-col>
                            <v-col cols="12" v-for="(incentivo) in dataIncentivos" :key="incentivo.area">
                                <incentivos-dimension
                                :area="incentivo.area"
                                :data="incentivo.data"
                                >
                                </incentivos-dimension>
                            </v-col>
                            
                            <v-col cols="12">
                                <v-textarea
                                    label="Conclusiones Plana 1 (Obligatorio)"
                                    auto-grow
                                    outlined
                                    rows="5"
                                    v-model="data.conclusiones"
                                    :rules="rules.conclusiones.rule"
                                    :counter="rules.conclusiones.counter"
                                    row-height="100"
                                    required
                                    ></v-textarea>
                            </v-col>
                            <v-col cols="12">
                                <v-textarea
                                    label="Conclusiones Plana 2 (No obligatorio)"
                                    auto-grow
                                    outlined
                                    rows="5"
                                    v-model="data.conclusiones2"
                                    :counter="rules.conclusiones.counter"
                                    row-height="100"
                                    ></v-textarea>
                            </v-col>
                            <v-col cols="12">
                                <v-textarea
                                    label="Conclusiones Plana 3 (No obligatorio)"
                                    auto-grow
                                    outlined
                                    rows="5"
                                    v-model="data.conclusiones3"
                                    :counter="rules.conclusiones.counter"
                                    row-height="100"
                                    ></v-textarea>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="4" class="pt-7">
                                <v-btn width="100%" @click="step=1"> Regresar </v-btn>
                            </v-col>
                            <v-col cols="4">
                                <submit-cx>Generar PDF></submit-cx>
                            </v-col>
                            <v-col cols="4" v-show="linkpdf">
                                <br/>
                                <a :href="linkpdf" target="_blank">Ver Archivo >> </a>
                            </v-col>
                        </v-row>
                    </form-cx>
                </v-stepper-content>
                </v-stepper-items>
            </v-stepper>
        </v-col>
    </v-row>
</template>

<script>

import Api from '@/api';
import Cookies from 'js-cookie'
import TituloPrincipalCx from '@/components/titulos/TituloPrincipalCx'
//import ResumenIndividualArea from '@/pages/reportes/ResumenIndividualArea'
import IncentivosDimension from '@/pages/reportes/IncentivosDimension'
import FormCx from '@/components/forms/FormCx'
import SubmitCx from '@/components/forms/SubmitCx'

import { mapGetters } from 'vuex'

export default {
    name: 'ReporteDiagnostico',
    data () {
        return {
            linkpdf: null,
            dialogProcesando: false,
            dataIndividualArea: [],
            dataIncentivos: [],


            dataGenero:null,
            dataAntiguedad:null,
            dataAreas:null,
            dataPromedioGeneral:null,
            dataPromedioPorAreas:null,
            dataPromedioPorGenero:null,
            dataPromedioPorAntiguedad:null,


            areaMayor: null,
            areaMenor: null,
            data: {
                _id_test: '',
                motivacion_general: {
                    satisfactorio: {
                        color: '#98c415',
                        desde: 80.01,
                        hasta: 100,
                        label: "Alto"
                    },
                    intermedio: {
                        color: '#ffd93b',
                        desde: 55.01,
                        hasta: 80,
                        label: "Medio"
                    },
                    bajo: {
                        color: '#ed1c24',
                        desde: 0,
                        hasta: 55,
                        label: "Bajo"
                    }
                },
                perfil_motivacional_individual: {
                    satisfactorio: {
                        color: '#98c415',
                        desde: 77.01,
                        hasta: 100,
                        label: "Alto"
                    },
                    intermedio: {
                        color: '#ffd93b',
                        desde: 52.01,
                        hasta: 77,
                        label: "Medio"
                    },
                    bajo: {
                        color: '#ed1c24',
                        desde: 0,
                        hasta: 52,
                        label: "Bajo"
                    }
                },
                factores_higienicos_individual: {
                    estatus: {
                        satisfactorio: {
                            color: '#98c415',
                            desde: 9.01,
                            hasta: 12,
                            label: "Alto"
                        },
                        intermedio: {
                            color: '#ffd93b',
                            desde: 6.01,
                            hasta: 9,
                            label: "Medio"
                        },
                        bajo: {
                            color: '#ed1c24',
                            desde: 0,
                            hasta: 6,
                            label: "Bajo"
                        }
                    },
                    relaciones_superiores: {
                        satisfactorio: {
                            color: '#98c415',
                            desde: 9.01,
                            hasta: 12,
                            label: "Alto"
                        },
                        intermedio: {
                            color: '#ffd93b',
                            desde: 6.01,
                            hasta: 9,
                            label: "Medio"
                        },
                        bajo: {
                            color: '#ed1c24',
                            desde: 0,
                            hasta: 6,
                            label: "Bajo"
                        }
                    },
                    relaciones_laborales: {
                        satisfactorio: {
                            color: '#98c415',
                            desde: 6.01,
                            hasta: 8,
                            label: "Alto"
                        },
                        intermedio: {
                            color: '#ffd93b',
                            desde: 4.01,
                            hasta: 6,
                            label: "Medio"
                        },
                        bajo: {
                            color: '#ed1c24',
                            desde: 0,
                            hasta: 4,
                            label: "Bajo"
                        }
                    },
                    politicas_empresa: {
                        satisfactorio: {
                            color: '#98c415',
                            desde: 12.01,
                            hasta: 16,
                            label: "Alto"
                        },
                        intermedio: {
                            color: '#ffd93b',
                            desde: 8.01,
                            hasta: 12,
                            label: "Medio"
                        },
                        bajo: {
                            color: '#ed1c24',
                            desde: 0,
                            hasta: 8,
                            label: "Bajo"
                        }
                    },
                    condiciones_trabajo: {
                        satisfactorio: {
                            color: '#98c415',
                            desde: 9.01,
                            hasta: 12,
                            label: "Alto"
                        },
                        intermedio: {
                            color: '#ffd93b',
                            desde: 6.01,
                            hasta: 9,
                            label: "Medio"
                        },
                        bajo: {
                            color: '#ed1c24',
                            desde: 0,
                            hasta: 6,
                            label: "Bajo"
                        }
                    }
                },
                factores_motivacionales_individual: {
                    autorrealizacion: {
                        satisfactorio: {
                            color: '#98c415',
                            desde: 24.01,
                            hasta: 32,
                            label: "Alto"
                        },
                        intermedio: {
                            color: '#ffd93b',
                            desde: 16.01,
                            hasta: 24,
                            label: "Medio"
                        },
                        bajo: {
                            color: '#ed1c24',
                            desde: 0,
                            hasta: 16,
                            label: "Bajo"
                        }
                    },
                    tareas: {
                        satisfactorio: {
                            color: '#98c415',
                            desde: 12.01,
                            hasta: 16,
                            label: "Alto"
                        },
                        intermedio: {
                            color: '#ffd93b',
                            desde: 8.01,
                            hasta: 12,
                            label: "Medio"
                        },
                        bajo: {
                            color: '#ed1c24',
                            desde: 0,
                            hasta: 8,
                            label: "Bajo"
                        }
                    },
                    crecimiento: {
                        satisfactorio: {
                            color: '#98c415',
                            desde: 15.01,
                            hasta: 20,
                            label: "Alto"
                        },
                        intermedio: {
                            color: '#ffd93b',
                            desde: 10.01,
                            hasta: 15,
                            label: "Medio"
                        },
                        bajo: {
                            color: '#ed1c24',
                            desde: 0,
                            hasta: 10,
                            label: "Bajo"
                        }
                    }
                },
                conclusiones: '',
                conclusiones2: '',
                conclusiones3: ''
            },
            chartOptionsGenero: {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: 'GÉNERO'
                },
                tooltip: {
                    pointFormat: '<b>{point.percentage:.2f}%</b>'
                },
                accessibility: {
                    point: {
                        valueSuffix: '%'
                    }
                },
                legend: {
                    align: 'center',
                    verticalAlign: 'top',
                    x: 0,
                    y: 0
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            distance: -30,
                            color: 'white',
                            enabled: true,
                            format: '<b>{point.percentage:.2f} %'
                        },
                        showInLegend: true
                    }
                },
                series: [{
                    name: 'Género',
                    colorByPoint: true,
                    data: []
                }]
            },
            chartOptionsAntiguedad: {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: 'ANTIGÜEDAD'
                },
                tooltip: {
                    pointFormat: '<b>{point.percentage:.2f}%</b>'
                },
                accessibility: {
                    point: {
                        valueSuffix: '%'
                    }
                },
                legend: {
                    align: 'center',
                    verticalAlign: 'top',
                    x: 0,
                    y: 0,
                    width: 340,
                    itemWidth: 170
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            distance: -30,
                            color: 'white',
                            enabled: true,
                            format: '<b>{point.percentage:.2f} %</b>'
                        },
                        showInLegend: true
                    }
                },
                series: [{
                    name: 'Antigüedad',
                    colorByPoint: true,
                    data: []
                }]
            },
            chartOptionsAreas: {
                chart: {
                    type: 'bar'
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: 'ÁREAS'
                },
                xAxis: {
                    type: 'category',
                    labels: {
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Cantidad de personas'
                    }
                },
                legend: {
                    enabled: false
                },
                tooltip: {
                    pointFormat: '<b>{point.y:.0f} personas</b>'
                },
                plotOptions: {
                    column: {
                        borderRadius: 5
                    }
                },
                series: [{
                    name: 'Cantidad de personas',
                    data: [],
                    dataLabels: {
                        enabled: true,
                        color: '#000000',
                        align: 'center',
                        
                    }
                }]
            },
            chartOptionsPromedioPorAreas: {
                chart: {
                    type: 'column'
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: 'Resumen General por Áreas'
                },
                xAxis: {
                    type: 'category',
                    labels: {
                        rotation: -45,
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Porcentaje de calificación'
                    },
                    max: 100,
                    labels: {
                        formatter: function() {
                            return this.value + ' %';
                        }
                    }
                },
                legend: {
                    enabled: false
                },
                tooltip: {
                    pointFormat: '<b>{point.y:.2f} %</b>'
                },
                plotOptions: {
                    column: {
                        borderRadius: 5,
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.y:.2f} %</b>'
                        },
                    }
                },
                series: [{
                    name: 'Porcentaje de calificación',
                    data: [],
                    dataLabels: {
                        enabled: true,
                        color: '#000000',
                        align: 'center',
                        
                    }
                }]
            },
            chartOptionsPromedioPorGenero: {
                chart: {
                    type: 'column'
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: 'Resumen General por Género'
                },
                xAxis: {
                    type: 'category',
                    labels: {
                        rotation: -45,
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                },
                yAxis: {
                    min: 0,
                    max: 100,
                    title: {
                        text: 'Porcentaje de calificación'
                    },

                    labels: {
                        formatter: function() {
                            return this.value + ' %';
                        }
                    }
                },
                legend: {
                    enabled: false
                },
                tooltip: {
                    pointFormat: '<b>{point.y:.2f} %</b>'
                },
                plotOptions: {
                    column: {
                        borderRadius: 5,
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.y:.2f} %</b>'
                        },
                    }
                },
                series: [{
                    name: 'Porcentaje de calificación',
                    data: [],
                    dataLabels: {
                        enabled: true,
                        color: '#000000',
                        align: 'center',
                        
                    }
                }]
            },
            chartOptionsPromedioPorAntiguedad: {
                chart: {
                    type: 'column'
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: 'Resumen General por Antigüedad'
                },
                xAxis: {
                    type: 'category',
                    labels: {
                        rotation: -45,
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                },
                yAxis: {
                    min: 0,
                    max: 100,
                    title: {
                        text: 'Porcentaje de calificación'
                    },

                    labels: {
                        formatter: function() {
                            return this.value + ' %';
                        }
                    }
                },
                legend: {
                    enabled: false
                },
                tooltip: {
                    pointFormat: '<b>{point.y:.2f} %</b>'
                },
                plotOptions: {
                    column: {
                        borderRadius: 5,
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.y:.2f} %</b>'
                        },
                    }
                },
                series: [{
                    name: 'Porcentaje de calificación',
                    data: [],
                    dataLabels: {
                        enabled: true,
                        color: '#000000',
                        align: 'center',
                        
                    }
                }]
            },
            id_reporte: null,

            promedioGeneral:{promedio:0,label:""},
            step: 1,
            min: 0,
            max: 100,
            tests: [],
            rules: {
                tests: {
                    rule: [
                        v => !!v || 'Evaluación es requerida',
                    ]
                },
                utilizar: {
                    rule: [
                        v => !!v || 'Este campo es requerido',
                        v => v.length <= this.rules.utilizar.counter || `Este campo debe ser menor o igual a ${this.rules.utilizar.counter} caracteres`,
                    ],
                    counter: 400
                },
                conclusiones: {
                    rule: [
                        v => !!v || 'Este campo es requerido ',
                        v => v.length <= this.rules.conclusiones.counter || `Este campo debe ser menor o igual a ${this.rules.conclusiones.counter} caracteres`,
                    ],
                    counter: 3000
                },
                composicion: {
                    rule: [
                        v => !!v || 'Este campo es requerido es requerido',
                        v => v.length <= this.rules.composicion.counter || `Este campo debe ser menor o igual a ${this.rules.composicion.counter} caracteres`,
                    ],
                    counter: 1000
                },
                acciones: {
                    rule: [
                        v => !!v || 'Este campo es requerido es requerido',
                        v => v.length <= this.rules.acciones.counter || `Este campo debe ser menor o igual a ${this.rules.acciones.counter} caracteres`,
                    ],
                    counter: 1000
                }
            }
        }
    },
    computed: {
        ...mapGetters(['system','baseurl']),
        method () {
            return 'post'
        },
        url () {
            return '/reportes/diagnostico/graficos'
        },
        urlPdf () {
            return '/reportes/diagnostico/pdf'
        },
        titulo () {
            return "Reporte Diagnóstico Motivacional"
        },
        dialogMensaje () {
            let mensaje = "Generando datos. Puede tardar unos minutos, espere por favor ..."
            if (this.step == 2)
                mensaje = "Generando PDF. Puede tardar unos minutos, espere por favor ..."
            return mensaje
        },
        dataParaPdf () {
            return {
                _id_test: this.data._id_test,
                conclusiones: this.data.conclusiones,
                conclusiones2: this.data.conclusiones2,
                conclusiones3: this.data.conclusiones3
            }
        }
        
    },
    watch : {
        'step': function(val) {
            this.data.conclusiones = val == 2 ? '' : ''
        }
    },
    components: {
        TituloPrincipalCx,
        FormCx,
        SubmitCx,
        /*ResumenIndividualArea,*/
        IncentivosDimension
    },
    async created() {
        let userLogged = Cookies.get("userLogged") ? JSON.parse(Cookies.get("userLogged")) : null
        let headers = { 'Content-Type': 'application/json','Authorization': `Bearer ${userLogged.token}` }
        const api = new Api(this.baseurl,'get',headers,{},{tipo:'diagnostico_motivacional'})
        let response = await api.call_respuesta_directa(`/tests/select/all`) 
        response = response.data ? response.data.data : this.tests
        this.tests = response
    },
    methods: {
        

        requeststarted () {
            this.dialogProcesando = true
        },

        success (response) {
            this.$notify(
                {
                    group: "bottom",
                    title: "Datos generados",
                    text: "Datos generados correctamente.",
                    type: 'success'
                },
                4000
            );
            this.chartOptionsGenero.series[0].data = response.data.data.dataGenero
            this.chartOptionsAntiguedad.series[0].data = response.data.data.dataAntiguedad
            this.chartOptionsAreas.series[0].data = response.data.data.dataAreas
            this.promedioGeneral = response.data.data.promedioGeneral
            this.chartOptionsPromedioPorAreas.series[0].data = response.data.data.dataPromedioPorAreas.data
            this.areaMayor = response.data.data.dataPromedioPorAreas.mayor
            this.areaMenor = response.data.data.dataPromedioPorAreas.menor
            this.chartOptionsPromedioPorGenero.series[0].data = response.data.data.dataPromedioPorGenero
            this.chartOptionsPromedioPorAntiguedad.series[0].data = response.data.data.dataPromedioPorAntiguedad

            this.dataGenero = response.data.data.dataGenero
            this.dataAntiguedad = response.data.data.dataAntiguedad
            this.dataAreas = response.data.data.dataAreas
            this.dataPromedioGeneral = response.data.data.promedioGeneral
            this.dataPromedioPorAreas = response.data.data.dataPromedioPorAreas
            this.dataPromedioPorGenero = response.data.data.dataPromedioPorGenero
            this.dataPromedioPorAntiguedad = response.data.data.dataPromedioPorAntiguedad
            this.id_reporte = response.data.data._id

            this.dataIndividualArea = response.data.data.dataIndividual
            this.dataIncentivos = response.data.data.dataIncentivos
            this.dialogProcesando = false
            this.step = 2
            //this.$router.push("/backoffice/empresas-listar");
        },
        error () {
            this.dialogProcesando = false
            this.$notify(
                {
                    group: "bottom",
                    title: "Error",
                    text: "Ocurrió un inconveniente",
                    type: "error"
                },
                4000
            );
            
        },

        successPdf (response) {
            this.dialogProcesando = false
            this.$notify(
                {
                    group: "bottom",
                    title: "Datos generados",
                    text: "PDF Generado correctamente.",
                    type: 'success'
                },
                4000
            );

            this.linkpdf = response.data.data
            
        }
    }
}
</script>

<style scoped>
   
</style>