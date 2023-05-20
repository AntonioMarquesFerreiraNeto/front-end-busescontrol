import { Component, AfterViewInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'busescontrol-frontend';

  //Para encolher/diminuir/aumentar o menu lateral do sistema.
  ngAfterViewInit() {
    $(document).ready(function () {

      // Defina a altura do elemento com a classe 'js-fullheight' igual à altura da janela
      $('.js-fullheight').css('height', $(window).height());

      // Atualize a altura do elemento sempre que a janela for redimensionada
      $(window).resize(function () {
        $('.js-fullheight').css('height', $(window).height());
      });

      // Ative a função de clique no elemento com o ID 'sidebarCollapse'
      $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
      });

    });

  }
}

