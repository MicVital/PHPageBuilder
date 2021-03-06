<?php

namespace PHPageBuilder\Modules\GrapesJS\Block;

use PHPageBuilder\Contracts\PageContract;
use PHPageBuilder\Contracts\ThemeContract;
use PHPageBuilder\ThemeBlock;

class BlockRenderer
{
    /**
     * @var ThemeContract $theme
     */
    protected $theme;

    /**
     * @var PageContract $page
     */
    protected $page;

    /**
     * @var array $renderContext
     */
    protected $renderContext;

    /**
     * @var bool $forPageBuilder
     */
    protected $forPageBuilder;

    /**
     * BlockRenderer constructor.
     *
     * @param ThemeContract $theme
     * @param PageContract $page
     * @param array $renderContext
     * @param bool $forPageBuilder
     */
    public function __construct(ThemeContract $theme, PageContract $page, $renderContext = [], $forPageBuilder = false)
    {
        $this->theme = $theme;
        $this->page = $page;
        $this->renderContext = $renderContext ?? [];
        $this->forPageBuilder = $forPageBuilder;
    }

    /**
     * Render a theme block with the given slug using the given block data.
     *
     * @param string $blockSlug
     * @param array|null $blockData
     * @param null $id                          id of the specific block instance
     * @return string
     */
    public function renderWithSlug(string $blockSlug, $blockData = null, $id = null)
    {
        $block = new ThemeBlock($this->theme, $blockSlug);
        return $this->render($block, $blockData, $id);
    }

    /**
     * Render the given theme block with the given stored block data.
     *
     * @param ThemeBlock $themeBlock
     * @param array|null $blockData
     * @param null $id                          id of the specific block instance
     * @return string
     */
    public function render(ThemeBlock $themeBlock, $blockData = null, $id = null)
    {
        $blockData = $blockData ?? [];

        if ($themeBlock->isHtmlBlock()) {
            $html = $this->renderHtmlBlock($themeBlock, $blockData);
        } else {
            $html = $this->renderDynamicBlock($themeBlock, $blockData);
        }

        if ($this->forPageBuilder) {
            $id = $id ?? $themeBlock->getSlug();
            $html = '<phpb-block block-slug="' . e($themeBlock->getSlug()) . '" block-id="' . e($id) . '" is-html="' . ($themeBlock->isHtmlBlock() ? 'true' : 'false') . '">'
                . $html
                . '</phpb-block>';
        } elseif (! $themeBlock->isHtmlBlock() && isset($blockData['attributes']['style-identifier'])) {
            // add wrapper div around dynamic blocks, which receives the style identifier class if styling is added to the dynamic block using the pagebuilder
            $html = '<div class="' . e($blockData['attributes']['style-identifier']) . '">' . $html . '</div>';
        }
        return $html;
    }

    /**
     * Render the given html theme block with the given stored block data.
     *
     * @param ThemeBlock $themeBlock
     * @param $blockData
     * @return string
     */
    protected function renderHtmlBlock(ThemeBlock $themeBlock, $blockData)
    {
        if (! empty($blockData)) {
            $html = $blockData;
        } else {
            $html = file_get_contents($themeBlock->getViewFile());
        }
        return $html;
    }

    /**
     * Render the given dynamic theme block with the given stored block data.
     *
     * @param ThemeBlock $themeBlock
     * @param $blockData
     * @return string
     */
    protected function renderDynamicBlock(ThemeBlock $themeBlock, $blockData)
    {
        $controller = new BaseController;
        $model = new BaseModel($themeBlock, $blockData, $this->forPageBuilder);
        $blockData = $blockData ?? [];

        if ($themeBlock->getModelFile()) {
            require_once $themeBlock->getModelFile();
            $modelClass = $themeBlock->getModelClass();
            $model = new $modelClass($themeBlock, $blockData, $this->forPageBuilder);
        }

        if ($themeBlock->getControllerFile()) {
            require_once $themeBlock->getControllerFile();
            $controllerClass = $themeBlock->getControllerClass();
            $controller = new $controllerClass;
        }
        $controller->init($model, $this->forPageBuilder);
        $controller->handleRequest();

        // init additional variables that should be accessible in the view
        $renderer = $this;
        $page = $this->page;
        $block = $model;

        // unset variables that should be inaccessible inside the view
        unset($controller, $model, $blockData);

        ob_start();
        require $themeBlock->getViewFile();
        $html = ob_get_contents();
        ob_end_clean();

        return $html;
    }
}
