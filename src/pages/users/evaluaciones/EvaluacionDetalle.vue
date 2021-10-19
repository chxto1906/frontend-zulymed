<template>
    <div> 
        <v-skeleton-loader v-if="mostrarSkeleton" type="table"></v-skeleton-loader>
        <div v-show="!mostrarSkeleton">
        <v-dialog v-model="dialogUsuario" persistent max-width="600px" overlay-opacity="1" :overlay-color="system.colores.texto_titulo_1">
            <form-cx action="#" method="put" :data="dataUserUpdate" :url="urlUser" @success="successUser" @error="errorUser">
                <v-card>
                    <v-card-title>
                        <div class="flex">
                            <div class="px-2"><v-img :src="system.logo" max-height="180" max-width="116"></v-img></div>
                            <div :style="{color: system.colores.texto_titulo_1}" style="word-break: break-word !important;" 
                            class="px-4 p-1 text-center text-lg md:text-xl lg:text-2xl">
                                Completa tus datos para iniciar con la evaluación
                            </div>
                        </div>
                    </v-card-title>
                    <v-divider light></v-divider>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12" class="py-0">
                                    <v-text-field
                                        v-model="data.empresa.nombre"
                                        label="Empresa"
                                        readonly
                                        disabled
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6" class="py-0">
                                    <v-text-field
                                        v-model="data.usuario.cedula"
                                        :rules="rules.cedula.rule"
                                        :counter="rules.cedula.counter"
                                        label="Cédula"
                                        required
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6" class="py-0">
                                    <v-text-field
                                        v-model="data.usuario.nombre"
                                        label="Nombre"
                                        required
                                        readonly
                                        disabled
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6" class="py-0">
                                    <v-text-field
                                        v-model="data.usuario.apellido"
                                        label="Apellido"
                                        readonly
                                        disabled
                                        required
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6" class="py-0">
                                    <v-text-field
                                        v-model="data.usuario.email"
                                        label="Email"
                                        readonly
                                        disabled
                                        required
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6" class="py-0">
                                    <v-text-field
                                        v-model="data.usuario.telefono"
                                        :rules="rules.telefono.rule"
                                        :counter="rules.telefono.counter"
                                        label="Teléfono"
                                        required
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6" class="py-0">
                                    <v-select
                                    :items="sexos"
                                    v-model="data.usuario.sexo"
                                    label="Sexo"
                                    :rules="rules.sexo.rule"
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" md="6" class="py-0">
                                    <v-menu
                                        ref="menu"
                                        v-model="menu"
                                        :close-on-content-click="false"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="auto"
                                    >
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field
                                                v-model="data.usuario.fecha_nacimiento"
                                                label="Fecha de Nacimiento"
                                                
                                                readonly
                                                v-bind="attrs"
                                                v-on="on"
                                            ></v-text-field>
                                        </template>
                                        <v-date-picker
                                            ref="picker"
                                            v-model="data.usuario.fecha_nacimiento"
                                            :max="new Date().toISOString().substr(0, 10)"
                                            min="1950-01-01"
                                            @change="save"
                                            ></v-date-picker>
                                    </v-menu>
                                </v-col>
                                <v-col cols="12" md="6" class="py-0">
                                    <v-select
                                    :items="departamentos"
                                    v-model="data.usuarioTest._id_departamento"
                                    label="Departamento"
                                    :rules="rules._id_departamento.rule"
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" md="6" class="py-0">
                                    <v-select
                                    :items="cargos"
                                    v-model="data.usuarioTest._id_cargo"
                                    label="Cargo"
                                    :rules="rules._id_cargo.rule"
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" md="6" class="py-0">
                                    <v-text-field
                                    v-model="data.usuarioTest.antiguedad"
                                    type="number"
                                    label="Antigüedad (meses)"
                                    :rules="rules.numeros.rule"
                                    required
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <submit-cx>Continuar</submit-cx>
                    </v-card-actions>
                </v-card>
            </form-cx>
        </v-dialog>
        
        <v-row v-show="!dialogComplete" v-if="!dialogUsuario">
            <v-col cols="12" class="py-0">
                <titulo-principal-cx style="word-break: break-word !important;" :titulo="titulo" />
            </v-col>
            <v-col cols="12" class="py-0">
                <form-cx action="#" :method="method" :data="dataSubmit" :url="url" @success="success" @error="error">
                    <v-container>
                        <v-dialog v-model="dialogComplete" max-width="500px" transition="dialog-top-transition">
                            <v-card>
                                <v-toolbar :style="{background: system.colores.fondo_menu_principal}">Evaluación</v-toolbar>
                                <v-card-text>
                                    <div class="text-h2 pa-12"><strong>GRACIAS</strong> por completar la evaluación.</div>
                                </v-card-text>
                                
                                <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1"  @click="closeComplete">Aceptar</v-btn>
                                <v-spacer></v-spacer>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>

                        <v-row>
                            <v-col cols="12">
                                <v-expand-transition>
                                <v-card class="mx-auto" v-show="expand">
                                    <v-card-title>
                                        <h2 class="display-1" style="word-break: break-word !important;" :style="{color: system.colores.texto_titulo_1}">{{ data.test.nombre }}</h2>
                                        <v-spacer></v-spacer>
                                        <span class="title" :style="{color: system.colores.texto_titulo_1}">
                                            {{ data.respondidas + '/' + data.total }}
                                        </span>
                                        
                                    </v-card-title>
                                    <v-card-text style="word-break: break-word !important;">
                                        {{ data.test.descripcion }}
                                    </v-card-text>
                                    <v-divider class="mx-4"></v-divider>
                                    <v-card-text>
                                        <v-row v-if="data.test.tipo=='desempeno'">
                                            <v-col cols="12" v-if="data.origen=='especificas'">
                                                <small>A continuación, usted encontrará otras afirmaciones a las cuales debe otorgarles una puntuación del 1 al 4; la clave para la calificación se encuentra a continuación:<br/>
                                                </small>
                                                <v-row>
                                                <v-col cols="4"></v-col>
                                                <v-col cols="4">
                                                <v-simple-table dense>
                                                    <template v-slot:default>
                                                    <thead>
                                                        <tr>
                                                            <th colspan="2" class="text-center">
                                                                Clave de respuestas
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td><strong>4</strong></td>
                                                            <td><small>Muy acorde con la afirmación</small></td>
                                                        </tr>
                                                        <tr>
                                                            <td><strong>3</strong></td>
                                                            <td><small>De acuerdo con la afirmación</small></td>
                                                        </tr>
                                                        <tr>
                                                            <td><strong>2</strong></td>
                                                            <td><small>En desacuerdo con la afirmación</small></td>
                                                        </tr>
                                                        <tr>
                                                            <td><strong>1</strong></td>
                                                            <td><small>Muy en desacuerdo con la afirmación</small></td>
                                                        </tr>
                                                    </tbody>
                                                    </template>
                                                </v-simple-table>
                                                </v-col>
                                                <v-col cols="4"></v-col>
                                                </v-row>
                                            </v-col>
                                            <v-col cols="12" v-else>
                                                <small>A continuación, usted encontrará otras afirmaciones a las cuales debe otorgarles una puntuación del 1 al 3; la clave para la calificación se encuentra a continuación:<br/>
                                                </small>
                                                <v-row>
                                                <v-col cols="4"></v-col>
                                                <v-col cols="4">
                                                <v-simple-table dense>
                                                    <template v-slot:default>
                                                    <thead>
                                                        <tr>
                                                            <th colspan="2" class="text-center">
                                                                Clave de respuestas
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td><strong>3</strong></td>
                                                            <td><small>Muy acorde con la afirmación</small></td>
                                                        </tr>
                                                        <tr>
                                                            <td><strong>2</strong></td>
                                                            <td><small>En desacuerdo con la afirmación</small></td>
                                                        </tr>
                                                        <tr>
                                                            <td><strong>1</strong></td>
                                                            <td><small>Muy en desacuerdo con la afirmación</small></td>
                                                        </tr>
                                                    </tbody>
                                                    </template>
                                                </v-simple-table>
                                                </v-col>
                                                <v-col cols="4"></v-col>
                                                </v-row>
                                            </v-col>
                                            <v-col cols="12" md="6"
                                                v-for="(pregunta,index) in data.preguntas" :key="pregunta._id">
                                                <v-card class="h-30 lg:h-30">
                                                    <v-card-title class="h-22 lg:h-10">
                                                        <div class="flex">
                                                            <p>
                                                                <v-chip x-small class="ma-2" dark :color="system.colores.texto_titulo_1" >
                                                                    {{pregunta.numero}}
                                                                </v-chip>
                                                            </p>
                                                            <p style="word-break: break-word !important;" :style="{background: system.colores.fondo_menu_principal}" 
                                                            class="text-xs lg:text-sm py-2 px-2 w-full leading-none break-words">
                                                                {{pregunta.descripcion}}
                                                            </p>
                                                        </div>
                                                    </v-card-title>
                                                    <v-card-actions v-if="data.origen=='especificas'" class="justify-center">
                                                        
                                                        <label >4</label>
                                                        <v-checkbox  on-icon="mdi-close-thick" v-model="dataSubmit.respuestas[index].value"  :value="pregunta.opcion_4" ></v-checkbox>
                                                        <label>3</label>
                                                        <v-checkbox on-icon="mdi-close-thick" v-model="dataSubmit.respuestas[index].value"  :value="pregunta.opcion_3"  ></v-checkbox>
                                                        <label>2</label>
                                                        <v-checkbox  on-icon="mdi-close-thick" v-model="dataSubmit.respuestas[index].value"  :value="pregunta.opcion_2"  ></v-checkbox>
                                                        <label>1</label>
                                                        <v-checkbox on-icon="mdi-close-thick" v-model="dataSubmit.respuestas[index].value"  :value="pregunta.opcion_1" ></v-checkbox>
                                                        
                                                    </v-card-actions>
                                                    <v-card-actions v-else class="justify-center">
                                                        
                                                        <label>3</label>
                                                        <v-checkbox on-icon="mdi-close-thick" v-model="dataSubmit.respuestas[index].value"  :value="pregunta.opcion_3"  ></v-checkbox>
                                                        <label>2</label>
                                                        <v-checkbox  on-icon="mdi-close-thick" v-model="dataSubmit.respuestas[index].value"  :value="pregunta.opcion_2"  ></v-checkbox>
                                                        <label>1</label>
                                                        <v-checkbox on-icon="mdi-close-thick" v-model="dataSubmit.respuestas[index].value"  :value="pregunta.opcion_1" ></v-checkbox>
                                                        
                                                    </v-card-actions>
                                                </v-card>
                                            </v-col>
                                        </v-row>
                                        <v-row v-if="data.test.tipo=='clima_laboral' || data.test.tipo == 'postcovid'">
                                            <v-col cols="12" md="4"
                                                v-for="(pregunta,index) in data.preguntas" :key="pregunta._id">
                                                <v-card class="h-50 lg:h-40">
                                                    <v-card-title class="h-32 lg:h-24">
                                                        <div class="flex">
                                                            <p>
                                                                <v-chip x-small class="ma-2" dark :color="system.colores.texto_titulo_1" >
                                                                    {{pregunta.orden}}
                                                                </v-chip>
                                                            </p>
                                                            <p style="word-break: break-word !important;" :style="{background: system.colores.fondo_menu_principal}" 
                                                            class="text-xs lg:text-sm py-2 px-2 w-full leading-none break-words">
                                                                {{pregunta.descripcion}}
                                                            </p>
                                                        </div>
                                                    </v-card-title>
                                                    <v-divider class="mx-4"></v-divider>
                                                    <v-card-actions class="justify-center">
                                                        <v-chip-group v-model="dataSubmit.respuestas[index].value" active-class="blue white--text" column>
                                                            <v-chip v-if="pregunta.si >= 0"  value="si">
                                                              Si
                                                            </v-chip>
                                                            <v-chip v-if="pregunta.no >= 0"  value="no">
                                                              No
                                                            </v-chip>
                                                            <v-chip v-if="pregunta.otro >= 0"  value="otro">
                                                              ?
                                                            </v-chip>
                                                            <!--<v-chip  :value="n" v-for="n in opciones" :key="n" >
                                                                {{ n == "otro" ? "?" : n.toUpperCase() }}
                                                            </v-chip>-->
                                                        </v-chip-group>
                                                    </v-card-actions>
                                                </v-card>
                                            </v-col>
                                        </v-row>
                                        <v-row v-if="data.test.tipo=='diagnostico_motivacional'">
                                            <v-col cols="12">
                                                <v-stepper v-model="seccion" >
                                                    <v-stepper-header>
                                                        <v-stepper-step color="orange" :complete="seccion > 1" step="1">
                                                            PERFIL MOTIVACIONAL
                                                        </v-stepper-step>
                                                        <v-divider></v-divider>
                                                        <v-stepper-step color="orange" :complete="seccion > 2" step="2">
                                                            FACTORES HIGIÉNICOS
                                                        </v-stepper-step>
                                                        <v-divider></v-divider>
                                                        <v-stepper-step color="orange" :complete="seccion > 3" step="3">
                                                            FACTORES MOTIVACIONALES
                                                        </v-stepper-step>
                                                        <v-divider></v-divider>
                                                        <v-stepper-step color="orange" :complete="seccion > 4" step="4">
                                                            NIVEL DE MOTIVACIÓN
                                                        </v-stepper-step>
                                                        <v-divider></v-divider>
                                                        <v-stepper-step :complete="seccion > 5" color="orange" step="5">
                                                            INCENTIVOS
                                                        </v-stepper-step>
                                                    </v-stepper-header>

                                                    <v-stepper-items>
                                                        <v-stepper-content step="1">
                                                            <v-row class="pt-0 mt-0">
                                                                <v-col cols="12" class="pt-0 mt-0">
                                                                    <small>A continuación, usted encontrará algunas afirmaciones para las cuales tendrá cuatro alternativas de repuesta y deberá calificarlas en función de la que más se identifica con su persona. Por ejemplo, el número 4 es la afirmación con la que más se identifica, el número 3 la siguiente y así, hasta llegar al 1 que es la afirmación con la que menos se identifica (para responder a las afirmaciones deberá considerar la clave de respuestas).<br/>
                                                                        <strong>*Todas las afirmaciones deben tener una calificación y los números NO pueden repetirse.</strong>
                                                                    </small>
                                                                    <v-row>
                                                                    <v-col cols="4"></v-col>
                                                                    <v-col cols="4">
                                                                    <v-simple-table dense>
                                                                        <template v-slot:default>
                                                                        <thead>
                                                                            <tr>
                                                                                <th colspan="2" class="text-center">
                                                                                    Clave de respuestas
                                                                                </th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td><strong>4</strong></td>
                                                                                <td><small>La afirmación con la que MÁS se identifica</small></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td><strong>3</strong></td>
                                                                                <td><small>La siguiente afirmación con la que se identifica</small></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td><strong>2</strong></td>
                                                                                <td><small>La afirmación con la que se identifica un poco</small></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td><strong>1</strong></td>
                                                                                <td><small>La afirmación con la que MENOS se identifica</small></td>
                                                                            </tr>
                                                                        </tbody>
                                                                        </template>
                                                                    </v-simple-table>
                                                                    </v-col>
                                                                    <v-col cols="4"></v-col>
                                                                    </v-row>
                                                                </v-col>
                                                                <v-col cols="12" md="6"
                                                                    v-for="(pregunta,index) in data.preguntas" :key="pregunta._id">
                                                                    <v-card class="h-30 lg:h-30">
                                                                        <v-card-title class="h-22 lg:h-10">
                                                                            <div class="flex">
                                                                                <p>
                                                                                    <v-chip x-small class="ma-2" dark :color="system.colores.texto_titulo_1" >
                                                                                        {{pregunta.numero}}
                                                                                    </v-chip>
                                                                                </p>
                                                                                <p style="word-break: break-word !important;" :style="{background: system.colores.fondo_menu_principal}" 
                                                                                class="text-xs lg:text-sm py-2 px-2 w-full leading-none break-words">
                                                                                    {{pregunta.descripcion}}
                                                                                </p>
                                                                            </div>
                                                                        </v-card-title>
                                                                        <v-card-actions class="justify-center">
                                                                            <label >4</label>
                                                                            <v-checkbox  on-icon="mdi-close-thick" :disabled="opcion4 != index && opcion4 != null"  @change="clickOptionGeneral(index,pregunta.opcion_4)" v-model="dataSubmit.respuestas[index].value"  :value="pregunta.opcion_4" ></v-checkbox>
                                                                            <label>3</label>
                                                                            <v-checkbox on-icon="mdi-close-thick" :disabled="opcion3 != index && opcion3 != null"  @change="clickOptionGeneral(index,pregunta.opcion_3)" v-model="dataSubmit.respuestas[index].value"  :value="pregunta.opcion_3"  ></v-checkbox>
                                                                            <label>2</label>
                                                                            <v-checkbox  on-icon="mdi-close-thick" :disabled="opcion2 != index && opcion2 != null"  @change="clickOptionGeneral(index,pregunta.opcion_2)" v-model="dataSubmit.respuestas[index].value"  :value="pregunta.opcion_2"  ></v-checkbox>
                                                                            <label>1</label>
                                                                            <v-checkbox on-icon="mdi-close-thick" :disabled="opcion1 != index && opcion1 != null"  @change="clickOptionGeneral(index,pregunta.opcion_1)" v-model="dataSubmit.respuestas[index].value"  :value="pregunta.opcion_1" ></v-checkbox>
                                                                            
                                                                        </v-card-actions>
                                                                    </v-card>
                                                                </v-col>
                                                            </v-row>
                                                        </v-stepper-content>

                                                        <v-stepper-content step="2">
                                                            <v-row>
                                                                <v-col cols="12">
                                                                    <small>A continuación, usted encontrará otras afirmaciones a las cuales debe otorgarles una puntuación del 1 al 4; la clave para la calificación se encuentra a continuación:<br/>
                                                                        <strong>*En esta sección sí podrán repetirse los números</strong>
                                                                    </small>
                                                                    <v-row>
                                                                    <v-col cols="4"></v-col>
                                                                    <v-col cols="4">
                                                                    <v-simple-table dense>
                                                                        <template v-slot:default>
                                                                        <thead>
                                                                            <tr>
                                                                                <th colspan="2" class="text-center">
                                                                                    Clave de respuestas
                                                                                </th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td><strong>4</strong></td>
                                                                                <td><small>Muy acorde con la afirmación</small></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td><strong>3</strong></td>
                                                                                <td><small>De acuerdo con la afirmación</small></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td><strong>2</strong></td>
                                                                                <td><small>En desacuerdo con la afirmación</small></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td><strong>1</strong></td>
                                                                                <td><small>Muy en desacuerdo con la afirmación</small></td>
                                                                            </tr>
                                                                        </tbody>
                                                                        </template>
                                                                    </v-simple-table>
                                                                    </v-col>
                                                                    <v-col cols="4"></v-col>
                                                                    </v-row>
                                                                </v-col>
                                                                <v-col cols="12" md="6"
                                                                    v-for="(pregunta,index) in data.preguntas" :key="pregunta._id">
                                                                    <v-card class="h-30 lg:h-30">
                                                                        <v-card-title class="h-22 lg:h-10">
                                                                            <div class="flex">
                                                                                <p>
                                                                                    <v-chip x-small class="ma-2" dark :color="system.colores.texto_titulo_1" >
                                                                                        {{pregunta.numero}}
                                                                                    </v-chip>
                                                                                </p>
                                                                                <p style="word-break: break-word !important;" :style="{background: system.colores.fondo_menu_principal}" 
                                                                                class="text-xs lg:text-sm py-2 px-2 w-full leading-none break-words">
                                                                                    {{pregunta.descripcion}}
                                                                                </p>
                                                                            </div>
                                                                        </v-card-title>
                                                                        <v-card-actions class="justify-center">
                                                                            
                                                                            <label >4</label>
                                                                            <v-checkbox  on-icon="mdi-close-thick" v-model="dataSubmit.respuestas[index].value"  :value="pregunta.opcion_4" ></v-checkbox>
                                                                            <label>3</label>
                                                                            <v-checkbox on-icon="mdi-close-thick" v-model="dataSubmit.respuestas[index].value"  :value="pregunta.opcion_3"  ></v-checkbox>
                                                                            <label>2</label>
                                                                            <v-checkbox  on-icon="mdi-close-thick" v-model="dataSubmit.respuestas[index].value"  :value="pregunta.opcion_2"  ></v-checkbox>
                                                                            <label>1</label>
                                                                            <v-checkbox on-icon="mdi-close-thick" v-model="dataSubmit.respuestas[index].value"  :value="pregunta.opcion_1" ></v-checkbox>
                                                                            
                                                                        </v-card-actions>
                                                                    </v-card>
                                                                </v-col>
                                                            </v-row>
                                                        </v-stepper-content>

                                                        <v-stepper-content step="3">
                                                            <v-row>
                                                                <v-col cols="12">
                                                                    <small>A continuación, usted encontrará otras afirmaciones a las cuales debe otorgarles una puntuación del 1 al 4; la clave para la calificación se encuentra a continuación: <br/>
                                                                        <strong>*En esta sección también podrán repetirse los números</strong>
                                                                    </small>
                                                                    <v-row>
                                                                    <v-col cols="4"></v-col>
                                                                    <v-col cols="4">
                                                                    <v-simple-table dense>
                                                                        <template v-slot:default>
                                                                        <thead>
                                                                            <tr>
                                                                                <th colspan="2" class="text-center">
                                                                                    Clave de respuestas
                                                                                </th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td><strong>4</strong></td>
                                                                                <td><small>Muy acorde con la afirmación</small></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td><strong>3</strong></td>
                                                                                <td><small>De acuerdo con la afirmación</small></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td><strong>2</strong></td>
                                                                                <td><small>En desacuerdo con la afirmación</small></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td><strong>1</strong></td>
                                                                                <td><small>Muy en desacuerdo con la afirmación</small></td>
                                                                            </tr>
                                                                        </tbody>
                                                                        </template>
                                                                    </v-simple-table>
                                                                    </v-col>
                                                                    <v-col cols="4"></v-col>
                                                                    </v-row>
                                                                </v-col>
                                                                <v-col cols="12" md="6"
                                                                    v-for="(pregunta,index) in data.preguntas" :key="pregunta._id">
                                                                    <v-card class="h-30 lg:h-30">
                                                                        <v-card-title class="h-22 lg:h-10">
                                                                            <div class="flex">
                                                                                <p>
                                                                                    <v-chip x-small class="ma-2" dark :color="system.colores.texto_titulo_1" >
                                                                                        {{pregunta.numero}}
                                                                                    </v-chip>
                                                                                </p>
                                                                                <p style="word-break: break-word !important;" :style="{background: system.colores.fondo_menu_principal}" 
                                                                                class="text-xs lg:text-sm py-2 px-2 w-full leading-none break-words">
                                                                                    {{pregunta.descripcion}}
                                                                                </p>
                                                                            </div>
                                                                        </v-card-title>
                                                                        <v-card-actions class="justify-center">
                                                                            
                                                                            <label>4</label>
                                                                            <v-checkbox  on-icon="mdi-close-thick" v-model="dataSubmit.respuestas[index].value"  :value="pregunta.opcion_4" ></v-checkbox>
                                                                            <label>3</label>
                                                                            <v-checkbox on-icon="mdi-close-thick" v-model="dataSubmit.respuestas[index].value"  :value="pregunta.opcion_3"  ></v-checkbox>
                                                                            <label>2</label>
                                                                            <v-checkbox  on-icon="mdi-close-thick" v-model="dataSubmit.respuestas[index].value"  :value="pregunta.opcion_2"  ></v-checkbox>
                                                                            <label>1</label>
                                                                            <v-checkbox on-icon="mdi-close-thick" v-model="dataSubmit.respuestas[index].value"  :value="pregunta.opcion_1" ></v-checkbox>
                                                                            
                                                                        </v-card-actions>
                                                                    </v-card>
                                                                </v-col>
                                                            </v-row>
                                                        </v-stepper-content>
                                                        <v-stepper-content step="4">
                                                            <v-row>
                                                                <v-col cols="12">
                                                                    <small>A continuación, usted encontrará otras afirmaciones a las cuales debe otorgarles una puntuación del 1 al 4; la clave para la calificación se encuentra a continuación:<br/>
                                                                        <strong>*En esta sección también podrán repetirse los números</strong>
                                                                    </small>
                                                                    <v-row>
                                                                    <v-col cols="4"></v-col>
                                                                    <v-col cols="4">
                                                                    <v-simple-table dense>
                                                                        <template v-slot:default>
                                                                        <thead>
                                                                            <tr>
                                                                                <th colspan="2" class="text-center">
                                                                                    Clave de respuestas
                                                                                </th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td><strong>4</strong></td>
                                                                                <td><small>Muy acorde con la afirmación</small></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td><strong>3</strong></td>
                                                                                <td><small>De acuerdo con la afirmación</small></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td><strong>2</strong></td>
                                                                                <td><small>En desacuerdo con la afirmación</small></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td><strong>1</strong></td>
                                                                                <td><small>Muy en desacuerdo con la afirmación</small></td>
                                                                            </tr>
                                                                        </tbody>
                                                                        </template>
                                                                    </v-simple-table>
                                                                    </v-col>
                                                                    <v-col cols="4"></v-col>
                                                                    </v-row>
                                                                </v-col>
                                                                <v-col cols="12" md="6"
                                                                    v-for="(pregunta,index) in data.preguntas" :key="pregunta._id">
                                                                    <v-card class="h-30 lg:h-30">
                                                                        <v-card-title class="h-22 lg:h-10">
                                                                            <div class="flex">
                                                                                <p>
                                                                                    <v-chip x-small class="ma-2" dark :color="system.colores.texto_titulo_1" >
                                                                                        {{pregunta.numero}}
                                                                                    </v-chip>
                                                                                </p>
                                                                                <p style="word-break: break-word !important;" :style="{background: system.colores.fondo_menu_principal}" 
                                                                                class="text-xs lg:text-sm py-2 px-2 w-full leading-none break-words">
                                                                                    {{pregunta.descripcion}}
                                                                                </p>
                                                                            </div>
                                                                        </v-card-title>
                                                                        <v-card-actions class="justify-center">
                                                                            
                                                                            <label>4</label>
                                                                            <v-checkbox  on-icon="mdi-close-thick" v-model="dataSubmit.respuestas[index].value"  :value="pregunta.opcion_4" ></v-checkbox>
                                                                            <label>3</label>
                                                                            <v-checkbox on-icon="mdi-close-thick" v-model="dataSubmit.respuestas[index].value"  :value="pregunta.opcion_3"  ></v-checkbox>
                                                                            <label>2</label>
                                                                            <v-checkbox  on-icon="mdi-close-thick" v-model="dataSubmit.respuestas[index].value"  :value="pregunta.opcion_2"  ></v-checkbox>
                                                                            <label>1</label>
                                                                            <v-checkbox on-icon="mdi-close-thick" v-model="dataSubmit.respuestas[index].value"  :value="pregunta.opcion_1" ></v-checkbox>
                                                                            
                                                                        </v-card-actions>
                                                                    </v-card>
                                                                </v-col>
                                                            </v-row>
                                                        </v-stepper-content>
                                                        <v-stepper-content step="5">
                                                            <v-row>
                                                                <v-col cols="12">
                                                                    <small>
                                                                        Finalmente, encontrará preguntas con varias opciones de respuesta, en este caso usted deberá seleccionar las <strong>dos opciones</strong> que más se relacionan con usted.
                                                                    </small>
                                                                </v-col>
                                                                <v-col cols="12" md="6"
                                                                    v-for="(pregunta,index) in data.preguntas" :key="pregunta._id">
                                                                    <v-card class="h-50 lg:h-140">
                                                                        <v-card-title class="h-32 lg:h-24">
                                                                            <div class="flex">
                                                                                <p>
                                                                                    <v-chip x-small class="ma-2" dark :color="system.colores.texto_titulo_1" >
                                                                                        {{pregunta.numero}}
                                                                                    </v-chip>
                                                                                </p>
                                                                                <p style="word-break: break-word !important;" :style="{background: system.colores.fondo_menu_principal}" 
                                                                                class="text-xs lg:text-sm py-2 px-2 w-full leading-none break-words">
                                                                                    {{pregunta.descripcion}}
                                                                                </p>
                                                                            </div>
                                                                        </v-card-title>
                                                                        <v-card-actions class="justify-center">
                                                                            <v-simple-table dense>

                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td><v-checkbox :disabled="dataSubmit.respuestas[index].value==2 && indexs[index].indexOf(4) == -1" @change="clickOptionUltima(index,4,pregunta.opcion_4,pregunta.label_4)"  on-icon="mdi-close-thick" :label="pregunta.label_4" :value="pregunta.opcion_4" ></v-checkbox></td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td><v-checkbox :disabled="dataSubmit.respuestas[index].value==2 && indexs[index].indexOf(3) == -1" @change="clickOptionUltima(index,3,pregunta.opcion_3,pregunta.label_3)"  on-icon="mdi-close-thick"  :label="pregunta.label_3" :value="pregunta.opcion_3"  ></v-checkbox></td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td><v-checkbox :disabled="dataSubmit.respuestas[index].value==2 && indexs[index].indexOf(2) == -1" @change="clickOptionUltima(index,2,pregunta.opcion_2,pregunta.label_2)"  on-icon="mdi-close-thick"  :label="pregunta.label_2" :value="pregunta.opcion_2"  ></v-checkbox></td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td><v-checkbox :disabled="dataSubmit.respuestas[index].value==2 && indexs[index].indexOf(1) == -1"  @change="clickOptionUltima(index,1,pregunta.opcion_1,pregunta.label_1)"  on-icon="mdi-close-thick"  :label="pregunta.label_1" :value="pregunta.opcion_1" ></v-checkbox></td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </v-simple-table>
                                                                            
                                                                       
                                                                            
                                                                        </v-card-actions>
                                                                    </v-card>
                                                                </v-col>
                                                            </v-row>
                                                        </v-stepper-content>
                                                    </v-stepper-items>
                                                </v-stepper>
                                            </v-col>
                                        </v-row>
                                    </v-card-text>
                                    <v-card-actions>
                                        <submit-cx color="orange" @submit="submit" v-show="showButtonDisabled" :disabled="!buttonDisabled">Siguiente</submit-cx>
                                    </v-card-actions>
                                </v-card>
                                </v-expand-transition>
                            </v-col>
                        </v-row>
                    </v-container>
                </form-cx>
            </v-col>
        </v-row>
        </div>
    </div>
</template>>

<script>

import Api from '@/api';
import Cookies from 'js-cookie'
import TituloPrincipalCx from '@/components/titulos/TituloPrincipalCx'
import FormCx from '@/components/forms/FormCx'
import SubmitCx from '@/components/forms/SubmitCx'

import { mapGetters } from 'vuex'

function getDefaultData() {
    return {
        respuestas_seccion_1: [],
        opcion1: null,
        opcion2: null,
        opcion3: null,
        opcion4: null,
        opcionUltima: null,
        indexs: {
            '0': [],
            '1': [],
            '2': [],
            '3': []
        },
        valorFalse: 0,
        data: {
            origen: null,
            preguntas: [],
            respondidas: 0,
            total: 0,
            test: {
                descripcion: '',
                nombre: '',
                tipo: ''
            },
            empresa: {
                _id: '',
                nombre: ''
            },
            usuario: {
                cedula: '',
                nombre: '',
                apellido: '',
                email: '',
                telefono: '',
                fecha_nacimiento: null,
                sexo: '',
            },
            usuarioTest: {
                _id_test: '',
                _id_usuario: '',
                _id_empresa: '',
                _id_departamento: '',
                _id_cargo: '',
                antiguedad: '',
            },
            _id_usuario_test: ''
        },
        rules: {
            opcion() {
                return false
            },
            cedula: {
                rule: [
                    v => !!v || 'Cédula es requerida',
                    v => v.length == this.rules.cedula.counter || `La cédula debe ser igual a ${this.rules.cedula.counter} caracteres`,
                ],
                counter: 10
            },
            telefono: {
                rule: [
                    v => !!v || 'Teléfono es requerido',
                    v => v.length <= this.rules.telefono.counter || `El teléfono debe ser menor o igual a ${this.rules.telefono.counter} caracteres`,
                ],
                counter: 30
            },
            _id_departamento: {
                rule: [
                    v => !!v || 'Departamento es requerido'
                ]
            },
            sexo: {
                rule: [
                    v => !!v || 'Sexo es requerido'
                ]
            },
            _id_cargo: {
                rule: [
                    v => !!v || 'Cargo es requerido'
                ]
            },
            numeros: {
                rule: [
                    v  => {
                        if (!isNaN(parseFloat(v)) && v >= 0 && v <= 999) 
                            return true
                        else
                            return 'Se aceptan solo números desde 0 hasta 999'
                    }
                ]
            }
        },
        seccion: 1,
        seccionMaxima: 5,
        opciones: ['si','no','otro'],
        index0: [],
        index1: [],
        index2: [],
        index3: [],
        dataSubmit: {
            respuestas:[]
        },
        expand: true,
        dialogComplete: false,
        dialogUsuario: false,
        id_test: null,
        id_usuario: null,
        departamentos: [],
        cargos: [],
        menu: false,
        sexos: [
            {
                text: 'Masculino',
                value: 'M'
            },
            {
                text: 'Femenino',
                value: 'F'
            },
        ],
        showButtonDisabled: false,
        mostrarSkeleton: true,
    }
}

export default {
    name: 'EvaluacionDetalle',
    data: getDefaultData,
    computed: {
        ...mapGetters(['system','baseurl']),

        urlUser () {
            return `/usuarios/completar/usuariotest/${this.data._id_usuario_test}`
        },
        dataUserUpdate () {
            delete this.data.usuario._id
            let data = {
                usuario: this.data.usuario,
                usuarioTest: this.data.usuarioTest
            }

            return data
        },
        method () {
            return 'post'
        },
        url () {
            return '/respuestas/multiple'
        },
        titulo () {
            let titulo = `Completa la evaluación que te ha asignado ${this.data.empresa.nombre.toUpperCase()}:`
            return titulo
        },
        buttonDisabled () {
            for (var i = 0, l = this.dataSubmit.respuestas.length; i < l; i++) {
                const item = this.dataSubmit.respuestas[i]
                if (!item._id_pregunta
                    || !item._id_test
                    || !item._id_user
                    || !item.value) {
                        return false        
                    }
            }
            return true
        },
        
    },
    components: {
        TituloPrincipalCx,
        FormCx,
        SubmitCx
    },
    async created() {
        await this.readPregunta()   
    },
    methods: {
        
        quitarIndex: function(index){
            if (this.opcion1 == index)
                this.opcion1 = null
            if (this.opcion2 == index)
                this.opcion2 = null
            if (this.opcion3 == index)
                this.opcion3 = null
            if (this.opcion4 == index)
                this.opcion4 = null
        },

        clickOptionGeneral: function(index,valor) {
            if (this["opcion"+valor] == null){
                this.quitarIndex(index)
                this["opcion"+valor] = index
            }else{
                if (this["opcion"+valor] != index){
                    this.quitarIndex(index)
                    this["opcion"+valor] = index
                }else{
                    this["opcion"+valor] = null
                }
            }
                
        },

        clickOptionUltima:function(index, num_opcion, valor, opcion) {
            const i = this.indexs[index].indexOf(num_opcion)
            if (i != -1){
                //const j = this.dataSubmit.respuestas[index].opciones.indexOf(opcion)
                this.indexs[index].splice(i,1)
                delete this.dataSubmit.respuestas[index].opciones[opcion]
            }else{
                this.indexs[index].push(num_opcion)
                this.dataSubmit.respuestas[index].opciones[opcion] = parseInt(valor)
            }
            
            const sumValor = this.indexs[index].length * valor
            this.dataSubmit.respuestas[index].value = sumValor == 0 ? null : String(sumValor)
            
        },

        resetData: function () {
            this.$data = getDefaultData();
        },

        closeComplete () {
            this.dialogComplete = false
            this.$router.push("/evaluaciones-lista");
        },
        submit () {
            this.expand = false;
        },

        async readDepartamentos () {
            let userLogged = Cookies.get("userLogged") ? JSON.parse(Cookies.get("userLogged")) : null
            let headers = { 'Content-Type': 'application/json','Authorization': `Bearer ${userLogged.token}` }
            const params = {_id_empresa: this.data.empresa._id}
            const api = new Api(this.baseurl,'get',headers,{},params)
            let response = await api.call_respuesta_directa(`/departamentos/select/all`) 
            response = response.data ? response.data.data : this.departamentos
            this.departamentos = response
        },

        async readCargos () {
            let userLogged = Cookies.get("userLogged") ? JSON.parse(Cookies.get("userLogged")) : null
            let headers = { 'Content-Type': 'application/json','Authorization': `Bearer ${userLogged.token}` }
            const params = {_id_empresa: this.data.empresa._id}
            const api = new Api(this.baseurl,'get',headers,{},params)
            let response = await api.call_respuesta_directa(`/cargos/select/all`) 
            response = response.data ? response.data.data : this.cargos
            this.cargos = response
        },

        async readPregunta () {
            const ID_TEST = this.$route.params.id;
            this.mostrarSkeleton = true
            this.data.preguntas = []
            this.dataSubmit.respuestas = []
            this.opcion1=null
            this.opcion2=null
            this.opcion3=null
            this.opcion4=null
            let userLogged = Cookies.get("userLogged") ? JSON.parse(Cookies.get("userLogged")) : null
            if (userLogged && ID_TEST) {
                let headers = { 'Content-Type': 'application/json','Authorization': `Bearer ${userLogged.token}` }
                const query = {seccion:this.seccion}
                const api = new Api(this.baseurl,'get',headers,{},query)
                let response = await api.call_respuesta_directa(`/usuarios/preguntas-pendientes/test/${ID_TEST}`) 
                response = response.data ? response.data.data : this.data;
                this.data = response


                this.checkCompleteUser()
                if (this.dialogUsuario){
                    this.readDepartamentos()
                    this.readCargos()
                }

                if (this.data.respondidas == this.data.total && this.data.total != 0){
                    this.dialogComplete = true
                }

                if (this.data.preguntas.length > 0){
                    this.expand = true;
                    this.id_usuario = userLogged.user.id
                    this.id_test = ID_TEST
                    this.processRespuestas()
                    this.showButtonDisabled = true
                    this.mostrarSkeleton = false
                }else{
                    if (this.data.test.tipo == 'diagnostico_motivacional'){
                        if (this.seccion < this.seccionMaxima){
                            this.seccion ++
                            this.readPregunta()
                        }
                    }
                }

            }
        },

        checkCompleteUser() {
            const usuario = this.data.usuario;
            const usuarioTest = this.data.usuarioTest;
            if ((usuario.apellido 
                && usuario.cedula
                && usuario.email
                && usuario.fecha_nacimiento
                && usuario.nombre
                && usuario.sexo
                && usuario.telefono
                ) && ( usuarioTest._id_cargo
                    && usuarioTest._id_departamento
                    && usuarioTest._id_empresa
                    && usuarioTest._id_test
                    && usuarioTest._id_usuario
                    && usuarioTest.antiguedad
                    )){
                        this.dialogUsuario = false
            }else{
                this.dialogUsuario = true
            }

        },

        processRespuestas() {
            const that = this
            that.dataSubmit.respuestas = []
            this.data.preguntas.forEach(function(item){
                const dataAdd = {
                    _id_pregunta: item._id,
                    _id_user: that.id_usuario,
                    _id_test: that.id_test,
                    value: null,
                    opciones: {}
                }
                that.dataSubmit.respuestas.push(dataAdd)
            })
        },
        
        success () {
            this.readPregunta()
        },
        successUser () {
            this.dialogUsuario = false
        },
        error () {
            this.$notify(
                {
                    group: "bottom",
                    title: "Error",
                    text: "Ocurrió un inconveniente",
                    type: "error"
                },
                4000
            );
            this.readPregunta()
        },
        errorUser () {
            this.$notify(
                {
                    group: "bottom",
                    title: "Error",
                    text: "Ocurrió un inconveniente, inténtalo más tarde.",
                    type: "error"
                },
                4000
            );
        },
        save (date) {
            this.$refs.menu.save(date)
        },
    },
    watch: {
      menu (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      },
      dataSubmit: function(val){
          console.dir(val)
      }
    },
}
</script>

<style scoped>
   
</style>